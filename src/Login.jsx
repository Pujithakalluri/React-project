import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {

  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const submitLogic = (data) => {

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (user) => user.email === data.email && user.password === data.password
    );

    if (user) {
      alert("Login Successful");
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      alert("Invalid Email or Password");
    }

    reset();
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    alert("Logout Successful");
  };

  return (
    <div>
      

      {/* Top bar */}
      <div style={{display:"flex", justifyContent:"space-between", padding:"10px"}}>
        <h3>Welcome to Pujitha</h3>

        <div>
          

          <button onClick={logout} style={{marginLeft:"10px"}}>
            Logout
          </button>
        </div>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit(submitLogic)}>

        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />

        <br /><br />

        <button type="submit">Login</button>

      </form>

    </div>
  );
}

export default Login;