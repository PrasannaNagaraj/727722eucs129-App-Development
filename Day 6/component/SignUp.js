import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import '../assets/SignUp.css';

const quotes = [
    "Plan with ease, schedule with Poise.",
    "Organize your day, elevate your life.",
    "Efficiency meets simplicity in scheduling.",
    "Your time, your schedule, your way."
];
const getRandomQuote = () => {
    return quotes[Math.floor(Math.random() * quotes.length)];
};

const SignUp = () => {
    const [currentQuote, setCurrentQuote] = useState(getRandomQuote());
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentQuote(getRandomQuote());
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('User'); 
    const navigate = useNavigate();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(email, name, password, role);
        axios.post('http://localhost:3001/users', {
            email, name, password, role
        })
        .then(() => {
            toast.success('Signup successful!');
            setTimeout(() => {
                navigate('/Login');
            }, 2000);
        })
        .catch(err => {
            console.log(err);
            toast.error('Signup failed!');
        });
    };

    return (
        <div>
            <div>
                <div className='signup-logo'></div>
                <div className='signup-quote'><p>{currentQuote}</p></div>
                <Link to='/Login'><button className='signup-top-login'>LogIn</button></Link>
            </div>
            <div className="signupdiv">
                <h2>SignUp</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="SformGroup">
                        <input
                            type="email"
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="Sinput" autoFocus
                        />
                    </div>
                    <div className="SformGroup">
                        <input
                            type="text"
                            placeholder='UserName'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="Sinput"
                        />
                    </div>
                    <div className="SformGroup">
                        <input
                            type="password"
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="Sinput"
                        />
                    </div>
                    <div className="SformGroup">
                        <FormControl sx={{ width: '100%' , height:'80%' }} variant="outlined" className="Sinput">
                            <InputLabel>Role</InputLabel>
                            <Select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                label="Role"
                                required
                            >
                                <MenuItem value="User">User</MenuItem>
                                <MenuItem value="Admin">Admin</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <button type="submit" className="signup-submitbutton">Create Account</button>
                </form>
                <p>
                    Already have an account?
                    <Link to='/Login'>
                        <button className="login-button">LogIn</button>
                    </Link>
                </p>
            </div>
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
};

export default SignUp;
