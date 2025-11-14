import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
  e.preventDefault();
  try {
    // 1️⃣ Firebase registration
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2️⃣ Save user in MongoDB
    await axios.post("http://localhost:5000/api/user/register", {
      uid: user.uid,
      name,
      email
    });

    navigate("/dashboard");
  } catch (err) {
    console.error(err);
    alert("Registration failed: " + err.message);
  }
};


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow-md w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <input type="text" placeholder="Full Name" className="border p-2 rounded w-full" value={name} onChange={(e)=>setName(e.target.value)}/>
        <input type="email" placeholder="Email" className="border p-2 rounded w-full" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" className="border p-2 rounded w-full" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button className="bg-blue-600 text-white py-2 w-full rounded hover:bg-blue-700">Register</button>
      </form>
    </div>
  );
}
