import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { toast } from "sonner";
import { useSetAtom } from "jotai";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { setUserAtom } from "@/atoms/userAtoms";
import { authenticateUser, getUserIdToken, handleAuthenticationError } from "@/apis/auth";
import AppLayout from "@/pages/layouts/AppLayout";
import { useTranslation } from "react-i18next";

export default function ProtectedRoute() {
  const [loading, setLoading] = useState<boolean>(true);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const location = useLocation();
  const setUserAtomData = useSetAtom(setUserAtom);
  const { t } = useTranslation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (!user) {
          setAuthenticated(false);
          setUserAtomData(null);
          return;
        }
        const idToken = await getUserIdToken();
        if (!idToken || idToken === "") {
          throw new Error("failed to get user's id token");
        }
        const userData = await authenticateUser(idToken);
        setUserAtomData(userData);
        setAuthenticated(true);
        toast.message(`${t("toast.signIn.success", { name: userData.displayName })}`);
      } catch (error) {
        handleAuthenticationError(error);
        setUserAtomData(null);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }

  if (!authenticated && location.pathname !== "/login") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (authenticated && location.pathname === "/login") {
    return <Navigate to="/" replace />;
  }

  return <AppLayout />;
}
