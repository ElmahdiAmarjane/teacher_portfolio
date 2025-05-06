import React, { createContext, useState, useContext } from 'react';
import AlertSuccess from './AlertSuccess';
import AlertError from './AlertError';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const showAlert = (type, message, duration = 3000) => {
    const id = Date.now();
    setAlerts(prev => [...prev, { id, type, message }]);
    
    setTimeout(() => {
      removeAlert(id);
    }, duration);
  };

  const showSuccess = (message, duration) => {
    showAlert('success', message, duration);
  };

  const showError = (message, duration) => {
    showAlert('error', message, duration);
  };

  const removeAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  return (
    <AlertContext.Provider value={{ showSuccess, showError }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-3">
        {alerts.map(alert => (
          alert.type === 'success' ? (
            <AlertSuccess 
              key={alert.id} 
              message={alert.message} 
              onClose={() => removeAlert(alert.id)}
            />
          ) : (
            <AlertError 
              key={alert.id} 
              message={alert.message} 
              onClose={() => removeAlert(alert.id)}
            />
          )
        ))}
      </div>
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  return useContext(AlertContext);
};