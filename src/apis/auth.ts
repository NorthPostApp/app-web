import { auth } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignout,
  GithubAuthProvider,
  type AuthProvider,
} from "firebase/auth";
import { toast } from "sonner";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const handleThrowError = (error: unknown) => {
  const errorInstance = new Error("failed to signin. Please check the internet.");
  if (error instanceof Error) {
    errorInstance.message = error.message;
  } else if (typeof error === "string") {
    errorInstance.message = error;
  }
  toast.error(errorInstance.message);
  return errorInstance;
};

const signInWithProvider = async (provider: AuthProvider) => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    toast.message(`Welcome back ${result.user.displayName}`);
  } catch (error) {
    handleThrowError(error);
  }
};

const signInWithGoogle = () => signInWithProvider(googleProvider);
const signInWithGithub = () => signInWithProvider(githubProvider);

const signOut = async () => {
  try {
    await firebaseSignout(auth);
    toast("signed out");
  } catch (error) {
    throw handleThrowError(error);
  }
};

export { signInWithGoogle, signInWithGithub, signOut };
