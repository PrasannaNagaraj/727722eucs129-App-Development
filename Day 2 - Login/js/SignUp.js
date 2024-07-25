import React, { useState ,useEffect} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import '../assets/SignUp.css';
import axios from 'axios';
const quotes = [
    "Plan with ease, schedule with Poise.",
    "Organize your day, elevate your life.",
    "Efficiency meets simplicity in scheduling.",
    "Your time, your schedule, your way."
];
const getRandomQuote = () => {
    return quotes[Math.floor(Math.random() * quotes.length)];
};
const SignUp= () => {
    const [currentQuote, setCurrentQuote] = useState(getRandomQuote());
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentQuote(getRandomQuote());
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setname] = useState('');
    const nav=useNavigate();
    const Fun = (e) => {
        e.preventDefault();
        console.log(email);
        axios.post('http://localhost:3001/users',{
            email,name,password
        })
        .catch(err=>{console.log(err)})
        setTimeout(() => {
            nav('/');
        },1000);
    }
    return (
        <div>
            <div>
                <div className='signup-logo'></div>
                <div className='signup-quote'><p>{currentQuote}</p></div>
                <Link to='/Login'><button className='signup-top-login'>LogIn</button></Link>
            </div>
            <div className="signupdiv">
                <h2>SignUp</h2>
                <form onSubmit={Fun}>
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
                            onChange={(e) => setname(e.target.value)}
                            required
                            className="Sinput" autoFocus
                            />
                    </div>
                    <div className="SformGroup">
                        <input
                            type="password"
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="Sinput" />
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
        </div>
    );
};

export default SignUp;