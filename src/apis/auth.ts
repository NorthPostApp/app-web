import { auth } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignout,
  GithubAuthProvider,
  type AuthProvider,
} from "firebase/auth";
import { toast } from "sonner";
import { BASE_URL, type ServiceError } from "@/apis/shared";
import { GetUserDataResponse, type UserDataSchema } from "@/schemas/user";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const handleAuthenticationError = (error: unknown) => {
  const errorInstance = new Error("failed to signin. Please check the internet.");
  if (error instanceof Error) {
    errorInstance.message = error.message;
  } else if (typeof error === "string") {
    errorInstance.message = error;
  }
  toast.error(errorInstance.message);
  console.error(errorInstance);
};

// verify user data in database
const authenticateUser = async (idToken: string): Promise<UserDataSchema> => {
  const url = new URL("signin", BASE_URL);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  if (!response.ok) {
    const errorData = (await response.json()) as ServiceError;
    const errorMessage = errorData.error || "failed to authenticate user";
    throw new Error(errorMessage);
  }
  const userData = GetUserDataResponse.parse(await response.json()).data;
  return userData;
};

const signInWithProvider = async (provider: AuthProvider) => {
  await signInWithPopup(auth, provider);
};

const signInWithGoogle = () => signInWithProvider(googleProvider);
const signInWithGithub = () => signInWithProvider(githubProvider);

const signOut = async () => {
  await firebaseSignout(auth);
};

const getUserIdToken = async () => {
  return await auth.currentUser?.getIdToken();
};

export {
  signInWithGoogle,
  signInWithGithub,
  signOut,
  getUserIdToken,
  handleAuthenticationError,
  authenticateUser,
};
