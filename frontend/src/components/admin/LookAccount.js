import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser, getUserDetails, clearErrors } from '../../actions/userActions'
import { UPDATE_USER_RESET } from '../../constants/userConstants'

const LookAccount = ({ history, match }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole1] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, isUpdated } = useSelector(state => state.user);
    const { user } = useSelector(state => state.userDetails)

    const userId = match.params.id;

    useEffect(() => {

        console.log(user && user._id !== userId);
        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId))
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole1(user.role)
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success('Khóa tài khoản thành công!')

            history.push('/admin/users')

            dispatch({
                type: UPDATE_USER_RESET
            })
        }

    }, [dispatch, alert, error, history, isUpdated, userId, user])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('role', role);

        dispatch(updateUser(user._id, formData))
    }


    return (
        <Fragment>
            <MetaData title={`Update User`} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mt-2 mb-5">KHÓA TÀI KHOẢN</h1>
                                <img className='img_look container' src='https://us.123rf.com/450wm/yupiramos/yupiramos1709/yupiramos170901899/85031041-viejo-dise%C3%B1o-aislado-clave-del-ejemplo-del-vector-del-icono.jpg?ver=6' alt='' />
                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        name='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="role_field">Quyền</label>

                                    <select
                                        id="role_field"
                                        className="form-control"
                                        name='role'
                                        value="look"
                                        onChange={(e) => setRole1(e.target.value)}
                                    >
                                        <option value="look">Khóa tài khoản</option>
                                        <option value="look">Khóa tài khoản</option>
                                    </select>
                                </div>

                                <button type="submit" className="btn update-btn btn-block mt-4 mb-3" >Khóa tài khoản</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default LookAccount
