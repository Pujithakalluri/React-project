import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Register.css";


function Register() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const submitLogic = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(data);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration Successful!");
    navigate("/login"); 
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitLogic)}>
      <input type="text" 
      placeholder="Full Name" 
      {...register("fullName", { required: true })} />
      <br /><br />

      <input type="password" 
      placeholder="Password"
       {...register("password", { required: true })} />
      <br /><br />

      <input type="email"
       placeholder="Email" 
       {...register("email", { required: true })} />
      <br /><br />

      <input type="number"
       placeholder="Phone Number" 
       {...register("phone", { required: true })} />
      <br /><br />

      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
