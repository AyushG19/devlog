import { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router";
import { UserContext } from "../context/userContext";

export default function ActionPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [recheckPassword, setRecheckPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserContext);

  const toggleMode = () => {
    setIsLogin((prev) => !prev);
    setMessage("");
  };

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (res.status === 401 || res.status === 403) {
        setMessage("Username or password incorrect");
        return;
      }

      const data = await res.json();
      console.log("data for login: ", data);
      setUserInfo(data);
      localStorage.setItem("accessToken", data.accessToken);

      // navigate("/devlog");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSignup = async (e) => {
    if (password !== recheckPassword) {
      setMessage("*Check password");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.status === 403 || res.status === 401) {
        setMessage("Username unavailable");
        return;
      }
      setIsLogin(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-80 p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">
          {isLogin ? "Login Account" : "Sign Up Account"}
        </h2>
        <input
          type="text"
          placeholder={isLogin ? "Username" : "Choose Username"}
          className="w-full p-2 mb-3 border rounded bg-gray-700 border-gray-600"
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="relative w-full mb-3">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            className="w-full p-2 border rounded bg-gray-700 border-gray-600"
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPassword ? (
            <EyeOff
              className="absolute right-3 top-3 cursor-pointer text-gray-400"
              size={16}
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <Eye
              className="absolute right-3 top-3 cursor-pointer text-gray-400"
              size={16}
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>
        {!isLogin && (
          <div className="relative w-full mb-3">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Re-enter Password"
              className="w-full p-2 border rounded bg-gray-700 border-gray-600"
              onChange={(e) => setRecheckPassword(e.target.value)}
            />
          </div>
        )}
        {message && <p className="text-red-500 text-sm">{message}</p>}
        <button
          className="w-full py-2 mt-3 text-center bg-blue-600 hover:bg-blue-700 rounded"
          onClick={isLogin ? handleLogin : handleSignup}
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
        <p className="text-sm mt-3 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            className="ml-2 text-blue-400 cursor-pointer hover:underline"
            onClick={toggleMode}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}
