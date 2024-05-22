import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {connect} from 'react-redux';
import { login } from '../../Actions/auth';

const Login = ({login,isAuthenticated}) => {
    const [formData,setFormData] = useState({
        email:'',
        password:''
    });

    const {email,password} = formData;

    const onChange = e => setFormData({...formData,[e.target.name]:e.target.value})

    const onSubmit = e => {
        e.preventDefault();
        login(email,password);
    };
    const navigate = useNavigate();
    if (isAuthenticated)
        navigate('/dashboard')
        
    return (
            <div className="grid grid-flow-col grid-cols-5 w-[100vw] h-[100vh] font-poppins overflow-hidden">
                <div className="bg-[#070912] grid justify-center place-items-center lg:col-span-2 col-span-5">
                    <div className="w-[20rem] lg:w-[25rem] h-auto md:w-[22rem]">
                        <h2 className="text-white text-[3rem] sm:text-[4rem] lg:text-[5rem]">Login</h2>
                        <form onSubmit={e => onSubmit(e)}>
                            <div className="w-full">
                                <input className="w-full bg-transparent h-[2.5rem] mt-4 border-solid border-b-2 border-[#3b3d44] active:bg-transparent focus:outline-none focus:border-white focus:text-white transition duration-300 ease-in-out" type="email" placeholder="Email" name="email" value={email} onChange={e => onChange(e)} required />
                            </div>
                            <div className="w-full">
                                <input className="w-full bg-transparent h-[2.5rem] mt-4 border-solid border-b-2 border-[#3b3d44] active:bg-transparent focus:outline-none focus:border-white focus:text-white transition duration-300 ease-in-out" type="password" placeholder="Password" name="password" value={password} onChange={e => onChange(e)} required />
                            </div>
                            <div>
                                <button className="w-full h-[3rem] mt-6 rounded-[0.5rem] bg-[#394ebc] text-white hover:bg-[#4f5eac] transition duration-250 ease-in-out" type="submit">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="hidden md:bg-[#394ebc] md:col-span-3 md:block lg:grid lg:items-center lg:justify-center">
                    <div className="w-full px-4 sm:px-6 lg:px-8">
                        <div>
                            <h1 className="text-white text-[3rem] sm:text-[4rem] font-bold tracking-widest">Welcome to</h1>
                            <h1 className="text-white text-[3rem] sm:text-[4rem]">student portal</h1>
                        </div>
                        <img src="https://iili.io/JiIz9P2.png" className="w-full h-auto" alt="Login" />
                    </div>
                </div>
            </div>

    );
    

}
 const mapStateToProps = state =>(
     {
         isAuthenticated : state.auth.isAuthenticated
     }
 );

export default connect(mapStateToProps,{login})(Login);