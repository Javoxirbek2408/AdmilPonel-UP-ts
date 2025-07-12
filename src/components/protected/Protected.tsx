// src/components/ProtectedRoute.tsx

import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useStore from '../../context/store';

interface ProtectedRouteProps {
  onlyUnauthenticated?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  onlyUnauthenticated = false,
}) => {
  const auth = useStore((s) => s.auth);
  const location = useLocation();

  if (onlyUnauthenticated && auth) {
    return <Navigate to="/" replace />;
  }

  if (!onlyUnauthenticated && !auth) {
    return <Navigate to="/auth/signin" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
