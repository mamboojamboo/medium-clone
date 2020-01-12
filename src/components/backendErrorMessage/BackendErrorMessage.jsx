import React from 'react';

const BackendErrorMessage = ({ backendError }) => {
  const errorMessages = Object.keys(backendError).map((name) => {
    const messages = backendError[name].join(' ');
    return `${name} ${messages}`;
  });
  return (
  <ul className='error-messages'>
    {errorMessages.map((errorMessage) => (
      <li key={errorMessage}>{errorMessage}</li>
    ))}
  </ul>
  );
};

export default BackendErrorMessage;
