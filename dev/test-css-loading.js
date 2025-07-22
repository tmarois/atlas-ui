// This script will help us verify if the CSS is loading correctly
// Run this script with Node.js after starting the development server

const http = require('http');

// Make a request to the development server
http.get('http://localhost:3000', (res) => {
  let data = '';

  // A chunk of data has been received
  res.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received
  res.on('end', () => {
    console.log('Response status code:', res.statusCode);

    // Check if the response contains any CSS-related errors
    if (data.includes('[plugin:vite:css]') || data.includes('Error') || data.includes('error')) {
      console.error('CSS-related errors found in the response:');

      // Extract and print the error message
      const errorMatch = data.match(/\[plugin:vite:css\].*?(\n|$)/g);
      if (errorMatch) {
        console.error(errorMatch.join('\n'));
      } else {
        console.error('Could not extract specific error message.');
      }
    } else {
      console.log('No CSS-related errors found in the response.');
      console.log('Tailwind CSS should be loading correctly.');
    }
  });
}).on('error', (err) => {
  console.error('Error making request to development server:', err.message);
});

console.log('Checking if CSS is loading correctly...');
