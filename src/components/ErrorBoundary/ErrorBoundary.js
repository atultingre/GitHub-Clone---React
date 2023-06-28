import React, { useState, useEffect } from 'react';
import NotFound from './NotFound';

const ErrorBoundary = ({ children }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const componentDidCatch = (error, errorInfo) => {
      // Log the error or handle it in any way you want
      setError(error);
    };

    // Clean up the error state when the component unmounts
    return () => {
      setError(null);
    };
  }, []);

  if (error) {
    // Render your error message or custom error page
    return <NotFound/>;
  }

  // Render the child components normally
  return children;
};

export default ErrorBoundary;
