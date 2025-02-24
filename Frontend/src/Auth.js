// src/auth.js
export const isAuthenticated = () => {
    const token = localStorage.getItem('token'); // Assuming you store the JWT in localStorage
    return token && token !== 'undefined'; // You can add more checks if needed
  };
  