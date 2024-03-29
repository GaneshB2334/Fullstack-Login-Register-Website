import React from "react";
import { Link } from "react-router-dom";
import "./App.css"

function App() {

  return <>
  <div className="flex w-[70vw] justify-evenly m-auto my-[23px] ">
    <Link className="bg-gray-400 py-4 rounded-lg px-6" to="/login">Login</Link>
    <Link className="bg-gray-400 py-4 rounded-lg px-6" to="/register">Register</Link>
  </div>
  </>
}

export default App