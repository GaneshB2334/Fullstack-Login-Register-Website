import { useState } from "react";
import passvisible from "./assets/eye.png"
import passinvisible from "./assets/hide.png"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:3000/login', { email, password })
            .then(result => {
                if(result.data.message==="success"){
                    alert("Login Successful")
                    navigate('/')
                }
                else if(result.data.message==="incorrect password"){
                    alert("Incorrect password")
                }
                else if(result.data.message === "invalid id"){
                    alert("Invalid ID!")
                }
            })
            .catch(error => { console.error(error) })
    }
    return (
        <div className="border-black w-[70vw] m-auto flex flex-wrap border-2 justify-center items-center my-10">
            <form onSubmit={handleSubmit} className="w-[60vw] my-5">
                <div className="flex px-5 py-2 border-black border-2 justify-between items-center">
                    <label htmlFor="email">Email / Phone:</label>
                    <input
                        id="email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-[45vw] bg-gray-400 rounded-lg p-2"
                    />
                </div>
                <div className="relative flex px-5 py-2 border-black border-2 justify-between items-center">
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type={isChecked ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-[45vw] bg-gray-400 rounded-lg p-2"
                    />
                    <img className="absolute right-[30px] cursor-pointer h-[24px] w-[24px] " src={isChecked ? passvisible : passinvisible} onClick={() => { setIsChecked(!isChecked) }} alt="" />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3">Submit</button>
            </form>
            <Link to="/Register">Don't have an account? Register</Link>
        </div>
    );
}
