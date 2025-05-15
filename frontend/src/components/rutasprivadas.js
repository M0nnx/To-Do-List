import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

export const RutaPrivada = ({ children, rolRequerido }) => {
  const token = Cookies.get('access');
  const rol = Cookies.get('rol');

  if (!token) return <Navigate to="/login" />;
  if (rolRequerido && rol !== rolRequerido) return <Navigate to="/" />;

  return children;
};
