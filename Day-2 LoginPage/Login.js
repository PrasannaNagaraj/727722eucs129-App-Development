import { useState } from 'react';
const Login=()=>{
    const [visible, setVisible] = useState(true);
    const toggleVisibility = () => {
    setVisible(!visible);
    };

    const Register = () => {
        return(
        <div>
            <div>
            <h1>Register</h1>
            <input type='email' placeholder='Enter E-mail' className='input' /><br></br>
            <input type='text' placeholder='UserName' className='input' />
            <div>
                <input  placeholder='Enter Password' className='input' />
            </div>
            <button onClick={toggleVisibility}>Login</button><br></br>
            <a href='www.home.com'><b>Register</b></a>
            </div>
        </div>
        )
    };
    const Login1 = () => {
        return(
        <div>
            <h1>Login</h1>
            <input type='email' placeholder='Enter E-mail' className='input' />
            <div>
            <input  placeholder='Enter Password' className='input' />
            </div>
            <button onClick={toggleVisibility}>Register</button><br></br>
            <a href='www.home.com'><b>Login</b></a>
        </div>
        )
    };
    return(
        <>
            {visible ? <Login1></Login1>:<Register></Register>}
        </>
    );
};
export default Login;
