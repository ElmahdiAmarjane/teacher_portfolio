import { useState } from "react";
import { router } from "@inertiajs/react";
import backgroundImage from '@/assets/images/academic-bg.jpg';
import {
  EmailIcon,
  PasswordIcon,
  UserIcon,
  EyeIcon,
  EyeOffIcon,
  UniversityIcon,
  ErrorIcon,
  SuccessIcon
} from '@/assets/Icons/Icons';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [flashMessage, setFlashMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setFlashMessage(null);
    
    router.post('/register', {
      name,
      email,
      password,
    //   password_confirmation: passwordConfirmation,
    }, {
      onFinish: () => setIsLoading(false),
      onError: (errors) => {
        setErrors(errors);
        setFlashMessage({
          type: 'error',
          message: 'Registration failed. Please check your details.'
        });
      },
      onSuccess: () => {
        setFlashMessage({
          type: 'success',
          message: 'Registration successful! Redirecting...'
        });
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      
      <div className="relative w-full max-w-md px-8 py-8 bg-white shadow-xl rounded-lg z-10">
        {/* University Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-full border-4 border-indigo-100 bg-white shadow-md flex items-center justify-center">
            <UniversityIcon className="text-indigo-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Professor Portal
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Create your academic account
        </p>

        {/* Flash Message */}
        {flashMessage && (
          <div className={`mb-6 p-4 rounded-md ${
            flashMessage.type === 'error' 
              ? 'bg-red-50 border-l-4 border-red-500' 
              : 'bg-green-50 border-l-4 border-green-500'
          }`}>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {flashMessage.type === 'error' ? (
                  <ErrorIcon className="text-red-500" />
                ) : (
                  <SuccessIcon className="text-green-500" />
                )}
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${
                  flashMessage.type === 'error' ? 'text-red-700' : 'text-green-700'
                }`}>
                  {flashMessage.message}
                </p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="text-gray-400" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                required
                className={`block w-full pl-10 pr-3 py-2 border ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Institutional Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EmailIcon className="text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`block w-full pl-10 pr-3 py-2 border ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.name@university.edu"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <PasswordIcon className="text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                className={`block w-full pl-10 pr-10 py-2 border ${
                  errors.password ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <PasswordIcon className="text-gray-400" />
              </div>
              <input
                id="password_confirmation"
                name="password_confirmation"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                className={`block w-full pl-10 pr-10 py-2 border ${
                  errors.password_confirmation ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registering...
                </>
              ) : 'Register'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href={route('login')} className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;