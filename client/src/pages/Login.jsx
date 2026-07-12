import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://artisian-corner-production.up.railway.app/api/auth/login",
        {
          email,
          password,
        }
      );

      // Save token
      localStorage.setItem("token", response.data.token);
localStorage.setItem(
  "user",
  JSON.stringify(response.data.user)
);
      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

    toast.success("Login Successful");

      console.log(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);

      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Login
        </button>

      </form>
    </div>
  );
}

export default Login;