const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());

const DB_FILE = path.join(__dirname, "tutoring.db");
const SQL_FILE = path.join(__dirname, "tutoring_schema.sql");
const SECRET = "supersecret"; // In production, use environment variable

// =====================================
// Auto-create DB if missing
// =====================================
if (!fs.existsSync(DB_FILE)) {
  console.log("Database not found. Creating new DB from schema...");
  const initScript = fs.readFileSync(SQL_FILE, "utf8");
  const tempDb = new sqlite3.Database(DB_FILE);
  tempDb.exec(initScript, (err) => {
    if (err) console.error("Error initializing DB:", err.message);
    else console.log("Database created & initialized ✅");
  });
  tempDb.close();
}

// Connect DB
const db = new sqlite3.Database(DB_FILE);

// =====================================
// Middleware to verify JWT
// =====================================
function authMiddleware(role) {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ error: "No token" });

    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ error: "Invalid token" });
      if (role && decoded.role !== role && decoded.role !== "admin") {
        return res.status(403).json({ error: "Forbidden" });
      }
      req.user = decoded;
      next();
    });
  };
}

// =====================================
// STUDENT ROUTES
// =====================================
app.post("/api/register/student", async (req, res) => {
  const { name, email, password, subjects } = req.body;
  const hash = await bcrypt.hash(password, 10);
  db.run(
    "INSERT INTO Students (Name, Email, Password, Subjects) VALUES (?, ?, ?, ?)",
    [name, email, hash, subjects],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ UserID: this.lastID });
    }
  );
});

app.post("/api/login/student", (req, res) => {
  const { email, password } = req.body;
  db.get(
    "SELECT * FROM Students WHERE Email = ?",
    [email],
    async (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(401).json({ error: "Invalid email" });

      const valid = await bcrypt.compare(password, row.Password);
      if (!valid) return res.status(401).json({ error: "Invalid password" });

      const token = jwt.sign({ id: row.UserID, role: "student" }, SECRET, {
        expiresIn: "2h",
      });
      res.json({ token });
    }
  );
});

// =====================================
// TUTOR ROUTES
// =====================================
app.post("/api/register/tutor", async (req, res) => {
  const { name, email, password, subjects, price } = req.body;
  const hash = await bcrypt.hash(password, 10);
  db.run(
    "INSERT INTO Tutors (Name, Email, Password, Subjects, Price) VALUES (?, ?, ?, ?, ?)",
    [name, email, hash, subjects, price],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ TutorID: this.lastID });
    }
  );
});

app.post("/api/login/tutor", (req, res) => {
  const { email, password } = req.body;
  db.get("SELECT * FROM Tutors WHERE Email = ?", [email], async (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(401).json({ error: "Invalid email" });

    const valid = await bcrypt.compare(password, row.Password);
    if (!valid) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ id: row.TutorID, role: "tutor" }, SECRET, {
      expiresIn: "2h",
    });
    res.json({ token });
  });
});

// Public: Get all tutors
app.get("/api/tutors", (req, res) => {
  db.all(
    "SELECT TutorID, Name, Ratings, Subjects, Price FROM Tutors",
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// =====================================
// ADMIN ROUTES
// =====================================
app.post("/api/login/admin", (req, res) => {
  const { email, password } = req.body;
  db.get("SELECT * FROM Admins WHERE Email = ?", [email], async (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(401).json({ error: "Invalid email" });

    const valid = await bcrypt.compare(password, row.Password);
    if (!valid) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ id: row.AdminID, role: "admin" }, SECRET, {
      expiresIn: "2h",
    });
    res.json({ token });
  });
});

// Admin-only: list students
app.get("/api/admin/students", authMiddleware("admin"), (req, res) => {
  db.all(
    "SELECT UserID, Name, Email, Subjects FROM Students",
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// Admin-only: list tutors
app.get("/api/admin/tutors", authMiddleware("admin"), (req, res) => {
  db.all(
    "SELECT TutorID, Name, Email, Subjects, Ratings, Price FROM Tutors",
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// Admin-only: delete student
app.delete("/api/admin/students/:id", authMiddleware("admin"), (req, res) => {
  db.run(
    "DELETE FROM Students WHERE UserID = ?",
    [req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ deleted: this.changes });
    }
  );
});

// Admin-only: delete tutor
app.delete("/api/admin/tutors/:id", authMiddleware("admin"), (req, res) => {
  db.run(
    "DELETE FROM Tutors WHERE TutorID = ?",
    [req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ deleted: this.changes });
    }
  );
});

// =====================================
// START SERVER
// =====================================
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
