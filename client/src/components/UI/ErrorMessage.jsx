import React from 'react';
import Button from './Button';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="text-center py-12">
      <div className="inline-block p-4 bg-red-50 border-2 border-red-200 mb-4">
        <p className="text-red-800 font-semibold">{message || 'Something went wrong'}</p>
      </div>
      {onRetry && (
        <div className="mt-4">
          <Button onClick={onRetry} variant="secondary">
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;