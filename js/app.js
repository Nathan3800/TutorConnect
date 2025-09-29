const { useState, useEffect } = React;

// Icon Components
const Calendar = ({ size = 24, className = "" }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const Star = ({ size = 24, className = "" }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);

const TrendingUp = ({ size = 24, className = "" }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
    <polyline points="17,6 23,6 23,12" />
  </svg>
);

const Moon = ({ size = 24, className = "" }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const Sun = ({ size = 24, className = "" }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

// Main TutorConnect Component
const TutorConnect = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const themeClasses = darkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-gray-900";

  return (
    <div className={`min-h-screen ${themeClasses}`}>
      {/* Navbar */}
      <nav
        className={`sticky top-0 z-50 shadow-sm ${
          darkMode ? "bg-gray-800" : "bg-white"
        } border-b`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <a href="index.html" className="text-2xl font-bold text-blue-600">
              TutorConnect
            </a>

            <div className="hidden md:flex space-x-6">
              <a
                href="subjects.html"
                className="hover:text-blue-600 transition-colors"
              >
                Subjects
              </a>
              <a
                href="tutors.html"
                className="hover:text-blue-600 transition-colors"
              >
                Tutors
              </a>
              <a
                href="#dashboard"
                className="hover:text-blue-600 transition-colors"
              >
                Dashboard
              </a>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <a href="tutors.html">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <Calendar size={16} />
                  Book
                </button>
              </a>
              <a href="login-register.html">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Login
                </button>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Learn Smarter. Anywhere. Anytime.
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            TutorConnect connects students with expert tutors across a wide
            range of subjects.
          </p>
          <a href="tutors.html">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              Find a Tutor
            </button>
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">What is TutorConnect?</h2>
          <p className="text-xl max-w-4xl mx-auto leading-relaxed">
            TutorConnect is an online tutoring platform designed to make
            learning accessible, flexible, and effective. Our mission is to
            connect students with qualified tutors who can help them excel in
            academics and beyond.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-blue-600" size={32} />
              </div>
              <h5 className="text-xl font-bold mb-3">Easy Booking</h5>
              <p className="text-gray-600 dark:text-gray-300">
                Schedule tutoring sessions with just a few clicks using our
                intuitive booking system.
              </p>
            </div>

            <div className="p-6">
              <div className="bg-yellow-100 dark:bg-yellow-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-yellow-600" size={32} />
              </div>
              <h5 className="text-xl font-bold mb-3">Top-Rated Tutors</h5>
              <p className="text-gray-600 dark:text-gray-300">
                Browse tutor profiles, ratings, and reviews to find the best
                match for your needs.
              </p>
            </div>

            <div className="p-6">
              <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-green-600" size={32} />
              </div>
              <h5 className="text-xl font-bold mb-3">Track Progress</h5>
              <p className="text-gray-600 dark:text-gray-300">
                Monitor your learning journey with session history, ratings, and
                performance analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">Ready to start learning?</h2>
          <p className="text-xl mb-8">
            Join thousands of students achieving their academic goals with
            TutorConnect.
          </p>
          <a href="subjects.html">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              Get Started
            </button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          <div>© {currentYear} TutorConnect</div>
          <div className="space-x-6">
            <a href="privacy.html" className="hover:text-blue-600">
              Privacy
            </a>
            <a href="contact.html" className="hover:text-blue-600">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Render the app
ReactDOM.render(<TutorConnect />, document.getElementById("root"));
