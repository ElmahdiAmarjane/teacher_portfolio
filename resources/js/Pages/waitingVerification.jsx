import React from 'react';
import { FaCheckCircle } from 'react-icons/fa'; // Using react-icons for the checkmark

const WaitingVerification = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md border border-gray-200 rounded-lg shadow-sm p-8 bg-white">
        <div className="flex flex-col items-center text-center">
          {/* Green success icon */}
          <FaCheckCircle className="text-green-500 text-5xl mb-4" />
          
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Signup Successful</h1>
          <h2 className="text-lg text-gray-600 mb-6">Your account is pending approval</h2>
          
          <div className="space-y-4 text-gray-600 mb-8">
            <p>
              Thank you for signing up! Your account is currently under review by our admin team.
            </p>
            <p>
              You will receive an email notification once your account has been verified and activated.
            </p>
          </div>
          
          <a 
            href="/" 
            className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors text-center"
          >
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default WaitingVerification;