import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, provider } from "../../firebase/config";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful");
      navigate("/home")
    } catch (err) {
      alert(err.message);
    }
  };


  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      navigate("/chat")
    } catch (error) {
      console.error("Login error", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section - hidden on mobile */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-blue-500 to-blue-700 text-white p-10">
        <h1 className="text-4xl font-bold mb-4 text-center">Welcome Back!</h1>
        <p className="text-lg text-blue-100 max-w-sm text-center">
          We’re happy to see you again. Please log in to continue to your
          dashboard and enjoy the app’s features.
        </p>
      </div>

      {/* Right Section - full height on mobile */}
      <div className="flex justify-center items-center w-full md:w-1/2 bg-gradient-to-br from-blue-50 to-blue-100 p-6 md:p-0 min-h-screen md:min-h-0">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-grow h-px bg-blue-200"></div>
            <span className="mx-3 text-gray-400 text-sm">OR</span>
            <div className="flex-grow h-px bg-blue-200"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full border border-blue-300 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Login with Google
          </button>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline font-medium"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}