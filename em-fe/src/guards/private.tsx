import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const Private = (): ReactElement => {
  const token = localStorage.getItem('Token');

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default Private;
