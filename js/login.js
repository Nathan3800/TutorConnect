const { useState } = React;

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

const User = ({ size = 24, className = "" }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const Mail = ({ size = 24, className = "" }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const Lock = ({ size = 24, className = "" }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const Eye = ({ size = 24, className = "" }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOff = ({ size = 24, className = "" }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="m9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 11 8 11 8a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="m6.61 6.61A13.526 13.526 0 0 0 1 12s4 8 11 8a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);

const CheckCircle = ({ size = 24, className = "" }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22,4 12,14.01 9,11.01" />
  </svg>
);

// Main Login/Register Page Component
const LoginRegisterPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordSent, setForgotPasswordSent] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    role: "student",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      role: "student",
    });
    setFormErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    if (!isLogin) {
      if (!formData.firstName.trim()) {
        errors.firstName = "First name is required";
      }

      if (!formData.lastName.trim()) {
        errors.lastName = "Last name is required";
      }

      if (!formData.confirmPassword.trim()) {
        errors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      alert(
        `${
          isLogin ? "Login" : "Registration"
        } successful! Welcome to TutorConnect.`
      );
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        role: "student",
      });
    }, 1500);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();

    if (!forgotPasswordEmail.trim()) {
      setFormErrors({ forgotEmail: "Email is required" });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(forgotPasswordEmail)) {
      setFormErrors({ forgotEmail: "Please enter a valid email address" });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setForgotPasswordSent(true);
      setFormErrors({});
    }, 1500);
  };

  const themeClasses = darkMode
    ? "bg-gray-900 text-white"
    : "bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900";
  const cardClasses = darkMode
    ? "bg-gray-800 text-white border-gray-700"
    : "bg-white text-gray-900 border-gray-200";

  return (
    <div className={`min-h-screen ${themeClasses}`}>
      {/* Navbar */}
      <nav
        className={`sticky top-0 z-50 shadow-sm ${
          darkMode ? "bg-gray-800" : "bg-white"
        } border-b backdrop-blur-sm bg-opacity-90`}
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
                className={`p-2 rounded-lg border transition-colors ${
                  darkMode
                    ? "border-gray-600 hover:bg-gray-700 text-gray-300"
                    : "border-gray-300 hover:bg-gray-100 text-gray-600"
                }`}
              >
                <Moon size={20} />
              </button>
              <a href="tutors.html">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <Calendar size={16} />
                  Book
                </button>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-md">
          {/* Auth Card */}
          <div
            className={`${cardClasses} rounded-2xl shadow-xl border auth-transition overflow-hidden`}
          >
            {/* Header */}
            <div className="px-8 pt-8 pb-6 text-center">
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                  darkMode ? "bg-blue-900" : "bg-blue-100"
                }`}
              >
                <User className="text-blue-600" size={32} />
              </div>
              <h2 className="text-3xl font-bold mb-2">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                {isLogin
                  ? "Sign in to continue your learning journey"
                  : "Join thousands of students and tutors"}
              </p>
            </div>

            {/* Form */}
            <div className="px-8 pb-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${
                          formErrors.firstName
                            ? "border-red-500"
                            : darkMode
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                            : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                        }`}
                        placeholder="John"
                      />
                      {formErrors.firstName && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${
                          formErrors.lastName
                            ? "border-red-500"
                            : darkMode
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                            : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                        }`}
                        placeholder="Doe"
                      />
                      {formErrors.lastName && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.lastName}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${
                        formErrors.email
                          ? "border-red-500"
                          : darkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                      }`}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  {formErrors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${
                        formErrors.password
                          ? "border-red-500"
                          : darkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {formErrors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.password}
                    </p>
                  )}
                </div>

                {!isLogin && (
                  <>
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={20}
                        />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${
                            formErrors.confirmPassword
                              ? "border-red-500"
                              : darkMode
                              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                              : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                          }`}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                      {formErrors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.confirmPassword}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        I want to join as a:
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="role"
                            value="student"
                            checked={formData.role === "student"}
                            onChange={handleInputChange}
                            className="mr-2 text-blue-600"
                          />
                          Student
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="role"
                            value="tutor"
                            checked={formData.role === "tutor"}
                            onChange={handleInputChange}
                            className="mr-2 text-blue-600"
                          />
                          Tutor
                        </label>
                      </div>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : (
                    <>{isLogin ? "Sign In" : "Create Account"}</>
                  )}
                </button>
              </form>

              {isLogin && (
                <div className="text-center mt-4">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    Forgot your password?
                  </button>
                </div>
              )}
            </div>

            {/* Toggle Form */}
            <div
              className={`px-8 py-6 ${
                darkMode ? "bg-gray-700" : "bg-gray-50"
              } border-t ${
                darkMode ? "border-gray-600" : "border-gray-200"
              } text-center`}
            >
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <button
                  onClick={toggleForm}
                  className="ml-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 text-center">
            <div className="grid grid-cols-3 gap-4">
              <div
                className={`p-4 rounded-lg ${
                  darkMode ? "bg-gray-800" : "bg-white"
                } shadow-sm`}
              >
                <CheckCircle
                  className="text-green-500 mx-auto mb-2"
                  size={24}
                />
                <p
                  className={`text-xs ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Expert Tutors
                </p>
              </div>
              <div
                className={`p-4 rounded-lg ${
                  darkMode ? "bg-gray-800" : "bg-white"
                } shadow-sm`}
              >
                <CheckCircle
                  className="text-green-500 mx-auto mb-2"
                  size={24}
                />
                <p
                  className={`text-xs ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Easy Booking
                </p>
              </div>
              <div
                className={`p-4 rounded-lg ${
                  darkMode ? "bg-gray-800" : "bg-white"
                } shadow-sm`}
              >
                <CheckCircle
                  className="text-green-500 mx-auto mb-2"
                  size={24}
                />
                <p
                  className={`text-xs ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Progress Tracking
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className={`${cardClasses} rounded-xl p-8 w-full max-w-md border shadow-xl`}
          >
            {!forgotPasswordSent ? (
              <>
                <div className="text-center mb-6">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                      darkMode ? "bg-blue-900" : "bg-blue-100"
                    }`}
                  >
                    <Mail className="text-blue-600" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Reset Password</h3>
                  <p
                    className={`${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Enter your email address and we'll send you a link to reset
                    your password.
                  </p>
                </div>

                <form onSubmit={handleForgotPassword}>
                  <div className="mb-6">
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="email"
                        value={forgotPasswordEmail}
                        onChange={(e) => {
                          setForgotPasswordEmail(e.target.value);
                          setFormErrors({});
                        }}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${
                          formErrors.forgotEmail
                            ? "border-red-500"
                            : darkMode
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                            : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                        }`}
                        placeholder="your.email@example.com"
                      />
                    </div>
                    {formErrors.forgotEmail && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.forgotEmail}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForgotPassword(false);
                        setForgotPasswordEmail("");
                        setForgotPasswordSent(false);
                        setFormErrors({});
                      }}
                      className={`flex-1 px-4 py-3 border rounded-lg transition-colors font-medium ${
                        darkMode
                          ? "border-gray-600 hover:bg-gray-700 text-gray-300"
                          : "border-gray-300 hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`flex-1 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                        isSubmitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      } text-white`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Sending...
                        </>
                      ) : (
                        "Send Reset Link"
                      )}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                    darkMode ? "bg-green-900" : "bg-green-100"
                  }`}
                >
                  <CheckCircle className="text-green-600" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Email Sent!</h3>
                <p
                  className={`mb-6 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  We've sent a password reset link to{" "}
                  <span className="font-medium text-blue-600">
                    {forgotPasswordEmail}
                  </span>
                  . Check your email and follow the instructions to reset your
                  password.
                </p>
                <div
                  className={`p-4 rounded-lg mb-6 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-blue-50 border-blue-200"
                  } border`}
                >
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <strong>Didn't receive the email?</strong> Check your spam
                    folder or try again in a few minutes.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowForgotPassword(false);
                      setForgotPasswordEmail("");
                      setForgotPasswordSent(false);
                      setFormErrors({});
                    }}
                    className={`flex-1 px-4 py-3 border rounded-lg transition-colors font-medium ${
                      darkMode
                        ? "border-gray-600 hover:bg-gray-700 text-gray-300"
                        : "border-gray-300 hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    Back to Login
                  </button>
                  <button
                    onClick={() => {
                      setForgotPasswordSent(false);
                      setForgotPasswordEmail("");
                    }}
                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Resend Email
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer
        className={`py-6 border-t ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } mt-auto`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className={darkMode ? "text-gray-400" : "text-gray-600"}>
            © 2025 TutorConnect. All rights reserved.
          </div>
          <div className="space-x-6">
            <a
              href="privacy.html"
              className={`hover:text-blue-600 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Privacy
            </a>
            <a
              href="contact.html"
              className={`hover:text-blue-600 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Render the app
ReactDOM.render(<LoginRegisterPage />, document.getElementById("root"));
