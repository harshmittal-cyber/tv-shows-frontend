import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/userAction'
import Modal from '../components/Modal';
import { starIcon, grayStarIcon } from '../icons/svg';
import { addshow } from '../redux/actions/showAction';

const Navbar = () => {
    const dispatch = useDispatch()

    const { isAuthenticated } = useSelector((state) => state.userReducer);

    const { loading } = useSelector((state) => state.showReducer);

    const [image, setImage] = useState('')

    const initialInputs = { title: '', app: '', rating: 0, review: '' }

    const [inputs, setInputs] = useState(initialInputs);

    const error = { title: '', app: '', rating: '', review: '' }

    const [errors, setErrors] = useState(error);

    const stars = Array(5).fill(0);

    useEffect(() => {
        axios.get('https://picsum.photos/id/77/info').then((res) => {
            setImage(res.data.download_url)
        })
    }, [])

    const handleLogout = () => {
        dispatch(logout())
    }

    const openModal = () => {
        document.getElementById('addshowbutton').click();
    }

    const closeModal = (e) => {
        e.preventDefault();
        setInputs(initialInputs);
        document.getElementById('closeshowmodal').click();
    }


    const handleClick = (value) => {
        setInputs({
            ...inputs,
            rating: value
        })
    };

    const handleShowChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const addShowValidate = () => {
        let ratingError = ""
        let reviewError = ""
        let titleError = ""
        let appError = ""

        if (inputs.rating === 0) {
            ratingError = "Please select a rating"
        }
        if (inputs.review.trim().length < 10) {
            reviewError = "Please enter atleast 10 characters"
        }
        if (inputs.title.trim().length < 1) {
            titleError = "Please enter a title"
        }
        if (inputs.app.trim().length < 1) {
            appError = "Please enter app name"
        }

        if (ratingError || reviewError || titleError || appError) {
            setErrors({
                ...errors,
                rating: ratingError,
                review: reviewError,
                title: titleError,
                app: appError
            })
            return false;
        }

        return true;
    }

    const handleShowSubmit = (e) => {
        e.preventDefault();
        if (addShowValidate()) {
            dispatch(addshow(inputs)).then((res) => {
                if (res.success) {
                    setInputs(initialInputs);
                    closeModal(e)
                }
            })
        } else {
            displayErrorFunction('')
        }
    }

    const displayErrorFunction = (message) => {
        setTimeout(() => {
            setErrors(error)
        }, 3000)
    }

    return (
        <nav className="navbar navbar-light bg-primary">
            <div className="container-fluid">
                <div className='navbar-brand'>
                    <Link to='/'>
                        <img src={image} alt="imhh" width="30" height="30" className="d-inline-block align-text-top" style={{ borderRadius: '50%' }} />
                        <span className='h5 text-white mx-1 pt-10'>Techwondoe</span>
                    </Link>
                </div>
                <div>
                    {!isAuthenticated ?
                        <Link to='/login' className='nav-link text-white'>Login</Link>
                        :
                        <div className='d-flex'>
                            <button className='btn text-white' data-bs-toggle="modal" id="addshowbutton" data-bs-target="#addShows" onClick={openModal}>Add Shows</button>
                            <button type='button' className='btn' style={{ color: 'white' }} onClick={handleLogout}>Logout</button>
                        </div>
                    }
                </div>
                <Modal targetName={'addShows'}>
                    <div className='px-3 py-2'>
                        <h2 className='text-center'>Add Shows</h2>
                        <form id="item-form" autoComplete='off'>
                            <div className="d-flex mx-1 mt-3">
                                {stars.map((_, index) => {
                                    return (
                                        <span
                                            key={index}
                                            onClick={() => handleClick(index + 1)}
                                            className="me-2 cursor-pointer"
                                        >
                                            {inputs.rating > index ? starIcon : grayStarIcon}
                                        </span>
                                    );
                                })}
                            </div>
                            <small className='text-danger'>{errors.rating}</small>

                            <div className='mt-3'>
                                <label htmlFor="title" className='w-100 text-start'>Title</label>
                                <input className='form-control' type='text' name="title"
                                    placeholder='Enter Show Title' style={{ backgroundColor: '#EDF2F7' }}
                                    value={inputs.title} onChange={handleShowChange}
                                />
                                <small className='text-danger'>{errors.title}</small>
                            </div>

                            <div className='mt-3'>
                                <label htmlFor="app" className='w-100 text-start'>Streaming App</label>
                                <input className='form-control' type='text' name="app"
                                    placeholder='Enter Streaming App' style={{ backgroundColor: '#EDF2F7' }}
                                    value={inputs.app} onChange={handleShowChange}
                                />
                                <small className='text-danger'>{errors.app}</small>
                            </div>

                            <div className='mt-3'>
                                <label htmlFor="review" className='w-100 text-start'>Review</label>
                                <textarea className='form-control' type='text' name="review"
                                    placeholder='Enter Review Here' style={{ backgroundColor: '#EDF2F7' }}
                                    value={inputs.review} onChange={handleShowChange} maxLength={100}
                                />
                                <small className='text-danger'>{errors.review}</small>
                            </div>

                            <div className='row mt-4'>
                                <div className='col-6'>
                                    <button className='btn btn-outline-primary w-100' onClick={closeModal}>
                                        <span>Cancel</span>
                                    </button>
                                </div>
                                <div className='col-6'>
                                    <button className='btn btn-primary w-100' onClick={handleShowSubmit}>
                                        {loading ? <div className="spinner-border text-secondary loader-sizing" role="status"><span className="sr-only"></span></div> : <span>Save</span>}
                                    </button>
                                </div>
                            </div>

                        </form>
                    </div>
                    <button className='d-none' data-bs-dismiss="modal" id="closeshowmodal">Close show modal</button>
                </Modal>
            </div>
        </nav>
    )
}

export default Navbar