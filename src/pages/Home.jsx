import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteShow, getShows, updateShow } from '../redux/actions/showAction';
import { smallstarIcon, grayStarIcon, starIcon } from '../icons/svg';
import Modal from '../components/Modal';

const Home = () => {
    const dispatch = useDispatch();

    const { isAuthenticated } = useSelector(state => state.userReducer);

    const { shows, loading } = useSelector((state) => state.showReducer);

    const showState = { title: '', review: '', rating: Array(5).fill(0), app: '', _id: '' };

    const [update, setUpdate] = useState(showState);

    const errors = { title: '', app: '', rating: '', review: '' }

    const [updateError, setUpdateError] = useState(errors);

    const [showError, setShowError] = useState('')

    const stars = Array(5).fill(0);


    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getShows());
        }
    }, [isAuthenticated])

    const handleDelete = (id) => {
        dispatch(deleteShow(id))
    }

    const openModal = (show) => {
        document.getElementById('updateshowbutton').click();
        setUpdate({
            ...update,
            review: show.review,
            rating: show.rating,
            app: show.app,
            title: show.title,
            _id: show._id
        })
    }

    const closeModal = (e) => {
        e.preventDefault();
        setUpdate(showState);
        document.getElementById('closeUpdatemodal').click();
    }

    const handleUpdateChange = (e) => {
        setUpdate({
            ...update,
            [e.target.name]: e.target.value
        })
    }

    const handleRating = (value) => {
        setUpdate({
            ...update,
            rating: value
        })
    }

    const updateShowValidate = () => {
        let titleError = ""
        let reviewError = ""
        let ratingError = ""
        let appError = ""

        if (update.title.trim().length < 1) {
            titleError = "Please enter a title"
        }
        if (update.review.trim().length < 10) {
            reviewError = "Please enter atleast 10 characters"
        }
        if (update.rating.length === 0) {
            ratingError = "Please select a rating"
        }
        if (update.app.trim().length < 1) {
            appError = "Please enter app name"
        }
        if (titleError || reviewError || ratingError || appError) {
            setUpdateError({
                ...updateError,
                title: titleError,
                review: reviewError,
                rating: ratingError,
                app: appError
            })
            return false;
        }
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (updateShowValidate()) {
            dispatch(updateShow(update)).then((res) => {
                if (res.success) {
                    closeModal(e)
                } else {
                    setShowError(res.message)
                }
            })
        } else {
            displayErrorFunction("")
        }
    }

    const displayErrorFunction = (message) => {
        setTimeout(() => {
            setUpdateError(errors)
        }, 3000)
    }

    return (
        <div>
            <h2 className='pt-3 pl-2 mb-3'>My WatchList</h2>
            <div className='d-flex flex-wrap'>
                {!loading && shows.map((show, index) => {
                    return (
                        <div key={index} className='d-flex flex-row flex-wrap mx-2'>
                            <div className="card d-flex" style={{ width: '18rem' }}>
                                <img className="card-img" src={`https://source.unsplash.com/250x250/?streaming, app, movies`} alt="Card image cap" />
                                <div className="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <div className='d-flex'>
                                            <h5 className="card-title">{show.title}</h5>
                                            <span className='mx-2 '>({show.rating}<span className='mb-3'>{smallstarIcon})</span></span>
                                        </div>
                                        <div className="dropdown">
                                            <span className="text-muted" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {/* <i className="bi bi-three-dots-vertical"></i> */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                                </svg>
                                            </span>
                                            <div className="dropdown-menu">
                                                <button className="dropdown-item cursor-pointer text-primary-hover" data-bs-toggle="modal" id="updateshowbutton" data-bs-target="#updateShow" onClick={() => openModal(show)}>
                                                    Update Show
                                                </button>
                                                <button className="dropdown-item cursor-pointer text-primary-hover" onClick={() => handleDelete(show._id)}>
                                                    Delete Show
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="card-text">{show.review}</p>
                                    <button className="btn btn-primary">{show.app}</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <Modal targetName={'updateShow'}>
                    <div className='px-3 py-2'>
                        <h2 className='text-center'>Update Show</h2>
                        <span className='text-danger'>{showError}</span>
                        <form id="item-form" autoComplete='off'>
                            <div className="d-flex mx-1 mt-3">
                                {stars.map((_, index) => {
                                    return (
                                        <span
                                            key={index}
                                            onClick={() => handleRating(index + 1)}
                                            className="me-2 cursor-pointer"
                                        >
                                            {update.rating > index ? starIcon : grayStarIcon}
                                        </span>
                                    );
                                })}
                            </div>
                            <small className='text-danger'>{updateError.rating}</small>

                            <div className='mt-3'>
                                <label htmlFor="title" className='w-100 text-start'>Title</label>
                                <input className='form-control' type='text' name="title"
                                    placeholder='Enter Show Title' style={{ backgroundColor: '#EDF2F7' }}
                                    value={update.title} onChange={handleUpdateChange}
                                />
                                <small className='text-danger'>{updateError.title}</small>
                            </div>

                            <div className='mt-3'>
                                <label htmlFor="app" className='w-100 text-start'>Streaming App</label>
                                <input className='form-control' type='text' name="app"
                                    placeholder='Enter Streaming App' style={{ backgroundColor: '#EDF2F7' }}
                                    value={update.app} onChange={handleUpdateChange}
                                />
                                <small className='text-danger'>{updateError.app}</small>
                            </div>

                            <div className='mt-3'>
                                <label htmlFor="review" className='w-100 text-start'>Review</label>
                                <textarea className='form-control' type='text' name="review"
                                    placeholder='Enter Review Here' style={{ backgroundColor: '#EDF2F7' }}
                                    value={update.review} onChange={handleUpdateChange} maxLength={100}
                                />
                                <small className='text-danger'>{updateError.review}</small>
                            </div>

                            <div className='row mt-4'>
                                <div className='col-6'>
                                    <button className='btn btn-outline-primary w-100' onClick={closeModal}>
                                        <span>Cancel</span>
                                    </button>
                                </div>
                                <div className='col-6'>
                                    <button className='btn btn-primary w-100' onClick={handleSubmit}>
                                        {loading ? <div className="spinner-border text-secondary loader-sizing" role="status"><span className="sr-only"></span></div> : <span>Save</span>}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <button className='d-none' data-bs-dismiss="modal" id="closeUpdatemodal">Close show modal</button>
                </Modal>
            </div>
        </div>
    )
}

export default Home