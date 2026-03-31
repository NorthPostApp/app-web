import { signInWithGithub, signInWithGoogle } from "@/apis/auth";
export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1>Login Page</h1>
      <div className="flex flex-col">
        <button onClick={signInWithGoogle}>Google</button>
        <button onClick={signInWithGithub}>Github</button>
      </div>
    </div>
  );
}
