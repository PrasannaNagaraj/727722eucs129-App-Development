import React, { useState, useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom'; 
import axios from 'axios';
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
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const nav=useNavigate();
    const Fun = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:3001/users?email=${email}&pass=${password}`)
        .then(res=>{
            if(res.data.length>0){
                setTimeout(() => {
                    nav('/');
                },1000);
            }
        })
        console.log(email);
        e.preventDefault();  
    }
    return(
        <div className='maindiv'>
            <div>
                <div className='login-logo'><p></p></div>
                <div className='login-quote'><p>{currentQuote}</p></div>
                <Link to='/SignUp'><button className='login-top-signup'>Sign Up</button></Link>
            </div>
            <div className="logindiv">
                <h1>Login</h1>
                <form onSubmit={Fun}>
                    <div className="formelements">
                        <input
                            type="email"
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="details" 
                        />
                    </div>
                    <div className="formelements">
                        <input
                            type="password"
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="details" 
                        />
                    </div>
                    
                    <button type="submit" className="submitbutton">Login</button>
                </form>
                <p>
                    Don't have an account?
                    <Link to='/SignUp'>
                    <button className="signup-button">Sign Up</button>
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;