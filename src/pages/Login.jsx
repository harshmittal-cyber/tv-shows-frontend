import React, { useState, useEffect } from 'react'
import { login } from '../redux/actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { isAuthenticated, loading } = useSelector(
        (state) => state.userReducer
    );
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({ email: '', password: '' });
    const [displayError, setDisplayError] = useState(false);
    const logindata = {
        emailError: '', passwordError: ''
    }
    const [loginError, setLoginError] = useState(logindata);
    const [validError, setValidError] = useState(null);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated])

    const handleChange = (e) => {
        setUserData(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }



    const loginValidate = () => {
        let emailError = '';
        let passwordError = '';

        if (userData.email.trim().length < 1) {
            emailError = 'Email is required'
        }
        if (userData.password.trim().length < 1) {
            passwordError = 'Password is required'
        }
        if (emailError || passwordError) {
            setDisplayError(true)
            setLoginError({ emailError, passwordError })
            return false
        }
        return true

    }

    const handleSubmit = () => {
        if (loginValidate()) {
            if (emailValidation()) {
                dispatch(login(userData)).then((res) => {
                    console.log(res)
                    if (res.success) {
                        setUserData({ email: '', password: '' })
                    } else {
                        displayErrorFunction(res.message)
                    }
                })
            } else {
                displayErrorFunction('Invalid Email')
            }
        } else {
            displayErrorFunction('')
        }
    }

    const emailValidation = () => {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!userData.email || regex.test(userData.email) === false) {
            return false;
        }
        return true;
    }


    const displayErrorFunction = (message) => {
        setDisplayError(true)
        setValidError(message)
        setTimeout(() => {
            setDisplayError(false)
            setLoginError(logindata)
        }, 3000)
    }


    return (
        <div className='overflow-hidden'>
            <section>
                <div class="container py-5 h-100">
                    <div class="row d-flex align-items-center justify-content-center h-100">
                        <div class="col-md-8 col-lg-7 col-xl-6">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                class="img-fluid" alt="Phone" />
                        </div>
                        <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            <div class="form-outline mb-4">
                                <label class="form-label" for="form1Example13">Email address</label>
                                <input type="text" autoComplete='off' id="form1Example13" className={`form-control form-control-lg ${displayError && userData.email.trim().length < 1 && 'is-invalid'}`} name="email" onChange={handleChange} />
                                {displayError && <div className="invalid-feedback">{loginError.emailError}</div>}
                            </div>

                            <div class="form-outline mb-4">
                                <label class="form-label" for="form1Example23">Password</label>
                                <input type="password" autoComplete='off' id="form1Example23" className={`form-control form-control-lg ${displayError && userData.password.trim().length < 1 && 'is-invalid'}`} name="password" onChange={handleChange} />
                                {displayError && <div className="invalid-feedback">{loginError.passwordError}</div>}
                            </div>

                            <button type="submit" class="btn btn-primary btn-lg btn-block" onClick={handleSubmit}>
                                {loading ? <div className="spinner-border text-secondary loader-sizing" role="status"><span className="sr-only"></span></div> : 'Sign in'}
                            </button>
                            {displayError && <div className='text-danger'>{validError}</div>}
                            <div class="divider d-flex align-items-center my-4">
                                <p class="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                            </div>

                            <button class="btn btn-primary btn-lg btn-block" style={{ backgroundColor: "#3b5998" }}
                                type='button'>
                                <i class="fab fa-facebook-f me-2"></i>Continue with Facebook
                            </button>
                            <button class="btn btn-primary btn-lg btn-block" style={{ backgroundColor: "#55acee" }}
                                type="button">
                                <i class="fab fa-twitter me-2"></i>Continue with Twitter</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login