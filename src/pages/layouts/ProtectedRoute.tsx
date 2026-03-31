import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/userAtoms";
import { auth } from "@/lib/firebase";
import AppLayout from "@/pages/layouts/AppLayout";

export default function ProtectedRoute() {
  const [userData, setUserData] = useAtom(userAtom);
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserData(user);
      setLoading(false);
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }

  if (!userData && location.pathname !== "/login") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (userData && location.pathname === "/login") {
    return <Navigate to="/" replace />;
  }

  return <AppLayout />;
}
