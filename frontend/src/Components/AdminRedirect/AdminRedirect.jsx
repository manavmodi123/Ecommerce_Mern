// In AdminRedirect.js

import { useEffect } from 'react';

const AdminRedirect = () => {
  useEffect(() => {
    window.location.href = "http://localhost:5174";
  }, []);

  return null;
};

export default AdminRedirect;
