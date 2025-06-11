import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  filter: () => boolean;
  children: React.ReactElement;
}

export const PrivateRoute = ({ children, filter }: Props) => {
  const [authStatus, setAuthStatus] = useState<{
    checked: boolean;
    hasRole: boolean;
  }>({ checked: false, hasRole: false });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuthStatus({ checked: true, hasRole: false });
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const hasRole = payload?.rol !== undefined && payload.rol !== null;
      
      setAuthStatus({
        checked: true,
        hasRole: hasRole
      });
    } catch {
      setAuthStatus({ checked: true, hasRole: false });
    }
  }, [filter]);

  if (!authStatus.checked) {
    return null; // O un spinner de carga
  }

  if (!localStorage.getItem("token") && !authStatus.hasRole) {
    return <Navigate to="/home" />;
  }
  
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  if (!filter()) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};