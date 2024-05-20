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
    //isAuthenticated?
    if (isAuthenticated)
        navigate('/dashboard')
        
    //Redirect them to the home page
    return (
        <div className='container'>
            <div className='row align-items-center' style={{ backgroundColor: '#f8f9fa' , height:'100vh' }}>
                <div className='col-md-6'>
                    <h1>Login</h1>
                    <form onSubmit={e => onSubmit(e)}>
                        <div>
                            <input className="form-control mt-2" type='email' placeholder='Email' name='email' value={email} onChange={e => onChange(e)} required />
                        </div>
                        <div>
                            <input className='form-control mt-2' type='password' placeholder='Password' name='password' value={password} onChange={e => onChange(e)} minLength='8' required />
                        </div>
                        <button className='btn btn-primary mt-2' type = 'submit'>Login</button>
                    </form>
                </div>
                <div className='col-md-6'>
                    {/* Content for the right side */}
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