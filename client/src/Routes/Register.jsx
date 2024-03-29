import { useState } from "react";
import passvisible from "./assets/eye.png"
import passinvisible from "./assets/hide.png"
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

export default function Login() {
    const [isChecked, setIsChecked] = useState(false)
    const [formData, setFormData] = useState({ name: '', email: '', password: '' })
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post('http://localhost:3000/register', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (result.status === 201) {
                console.log("User registered successfully.", result.data);
                alert("User registered successfully")
                navigate('/')
            } else if (result.data === "AlreadyPresent") {
                alert("User already exist")
            } else {
                console.log("User registration failed!");
            }
        } catch (error) {
            console.error("An error occurred: ", error);
        }
    };

    const handleChange = async (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    return (
        <div className="border-black w-[70vw] m-auto flex flex-wrap border-2 justify-center items-center my-10">
            <form onSubmit={handleSubmit} className="w-[60vw] my-5">
                <div className="flex px-5 py-2 border-black border-2 justify-between items-center">
                    <label htmlFor="email">Name :-</label>
                    <input
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-[45vw] bg-gray-400 rounded-lg p-2"
                    />
                </div>
                <div className="flex px-5 py-2 border-black border-2 justify-between items-center">
                    <label htmlFor="email">Email / Phone:</label>
                    <input
                        name="email"
                        type="text"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-[45vw] bg-gray-400 rounded-lg p-2"
                    />
                </div>
                <div className="relative flex px-5 py-2 border-black border-2 justify-between items-center">
                    <label htmlFor="password">Password:</label>
                    <input
                        name="password"
                        type={isChecked ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        className="w-[45vw] bg-gray-400 rounded-lg p-2"
                    />
                    <img className="absolute right-[30px] cursor-pointer h-[24px] w-[24px] " src={isChecked ? passvisible : passinvisible} onClick={() => { setIsChecked(!isChecked) }} alt="" />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3">Submit</button>
            </form>
            <Link to="/login">Already have an account? Login</Link>
        </div>
    );
}
