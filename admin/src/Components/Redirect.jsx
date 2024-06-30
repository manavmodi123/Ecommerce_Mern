// In AdminRedirect.js

import { useEffect } from 'react';

const Redirect = () => {
  useEffect(() => {
    window.location.href = "http://localhost:5173";
  }, []);

  return null;
};

export default Redirect;
