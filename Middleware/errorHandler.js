// const express = require('express')
// function handleErrors(err, req, res, next) {
//     console.error(err.stack);
//     let statusCode = 500;
//     if (err.status) {
//       statusCode = err.status; // Use status code from the error object if available
//     } else if (err.name === 'ValidationError') {
//       statusCode = 400; // Bad Request for validation errors
//     } else if (err.name === 'NotFoundError') {
//       statusCode = 404; // Not Found
//     }
  
//     // Create a user-friendly error response object
//     const errorResponse = {
//       message: err.message || 'Internal Server Error', // Use error message or fallback
//       errors: err.errors || [], // Include specific validation errors if applicable
//     };
  
//     // Send the error response to the client
//     res.status(statusCode).json(errorResponse);
//   }
// module.exports = handleErrors  