import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/Login.css';
import bcrypt from 'bcryptjs'; // Make sure to install this package

const quotes = [
    "Plan with ease, schedule with Poise.",
    "Organize your day, elevate your life.",
    "Efficiency meets simplicity in scheduling.",
    "Your time, your schedule, your way."
];

const getRandomQuote = () => {
    return quotes[Math.floor(Math.random() * quotes.length)];
};

const Login = () => {
    const [currentQuote, setCurrentQuote] = useState(getRandomQuote());
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentQuote(getRandomQuote());
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate();
    
    const handleLogin = async (e) => {
        e.preventDefault();
        let admin = null;
        let user = null;
    
        try {
            const adminResponse = await axios.get(`http://localhost:8080/api/admins/getByEmail/${email}`);
            if (adminResponse.data) {
                admin = adminResponse.data;
            }
        } catch (error) {
            if (error.response && error.response.status !== 404) {
                console.error("Error fetching admin:", error);
            }
        }
    
        if (admin) {
            if (password === admin.password) {
                toast.success('Admin Login Successful!');
                // Wait for 3 seconds before navigating
                setTimeout(() => {
                    localStorage.setItem('user', JSON.stringify({ ...admin, role: 'admin' }));
                    nav('/admin');
                }, 3000);
                return;
            } else {
                toast.error("Incorrect password for admin. Please try again.");
                return;
            }
        }
    
        try {
            const userResponse = await axios.get(`http://localhost:8080/api/users/getByEmail/${email}`);
            if (userResponse.data) {
                user = userResponse.data;
            }
        } catch (error) {
            if (error.response && error.response.status !== 404) {
                console.error("Error fetching user:", error);
            }
        }
    
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                toast.success('User Login Successful!');
                // Wait for 3 seconds before navigating
                setTimeout(() => {
                    const { password, ...userWithoutPassword } = user;
                    localStorage.setItem('user', JSON.stringify({ ...userWithoutPassword, role: 'user' }));
                    nav('/user');
                }, 3000);
            } else {
                toast.error("Incorrect password for user. Please try again.");
            }
        } else {
            toast.error("User not found. Please check your email or sign up.");
        }
    };    
    
    return (
        <div className='login-page'>
            <div>
                <div className='login-logo'></div>
                <div className='login-quote'>{currentQuote}</div>
                <Link to='/SignUp'>
                    <button className='login-top-signup-button'>Sign Up</button>
                </Link>
            </div>
            <div className="login-container">
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="login-form-elements">
                        <input
                            type="email"
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="login-input"
                        />
                    </div>
                    <div className="login-form-elements">
                        <input
                            type="password"
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="login-input"
                        />
                    </div>
                    <button type="submit" className="login-submit-button">Login</button>
                </form>
                <p>
                    Don't have an account?
                    <Link to='/SignUp'>
                        <button className="login-signup-button">Sign Up</button>
                    </Link>
                </p>
            </div>
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
};

export default Login;