import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <input type="email" placeholder="Email" className="border p-2 rounded w-full" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" className="border p-2 rounded w-full" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button className="bg-blue-600 text-white py-2 w-full rounded hover:bg-blue-700">Login</button>
      </form>
    </div>
  );
}
