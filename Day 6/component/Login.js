import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/Login.css';

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
        try {
            const response = await axios.get(`http://localhost:3001/users?email=${email}`);
            if (response.data.length > 0) {
                const user = response.data[0];
                if (user.password=== password) {
                    toast.success('Login Successful!');
                    setTimeout(() => {
                        if (user.role === 'Admin') {
                            nav('/Admin');
                        } else {
                            nav('/user');
                            localStorage.setItem('user', JSON.stringify(user));
                        }
                    }, 1500);
                } else {
                    toast.error("Incorrect password.");
                }
            } else {
                toast.error("User not found.");
            }
        } catch (error) {
            toast.error("An error occurred.");
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
