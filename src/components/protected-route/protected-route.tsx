import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from '@store';
import { isAuthorizedSelector } from '@slices';

type ProtectedRouteProps = {
  forAuthorized: boolean;
};

export const ProtectedRoute = ({
  forAuthorized = false
}: ProtectedRouteProps) => {
  const location = useLocation();
  const from = location.state?.from || '/';
  const isAuthorized = useSelector(isAuthorizedSelector);
  if (forAuthorized && !isAuthorized) {
    return <Navigate to='/login' state={{ from: location }} />;
  }
  if (!forAuthorized && isAuthorized) {
    return <Navigate to={from} />;
  }
  return <Outlet />;
};
