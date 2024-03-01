import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'

const OrderSuccess = () => {
    localStorage.removeItem("cartItems");
    setTimeout(function() {
        window.location='/orders/me'
    }, 5000);
    
    return (
        <Fragment>

            <MetaData title={'Hoàn tất đặt hàng'} />

            <div className="row justify-content-center">
                <div className="col-6 mt-5 text-center">
                    <img className="my-5 img-fluid d-block mx-auto" src="/images/order_success.png" alt="Order Success" width="200" height="200" />

                    <h2>Đơn hàng của bạn đã được đặt thành công!</h2>

                    <Link to="/orders/me">Tự động chuyển hướng tới hóa đơn sau 5 giây ...</Link>
                </div>

            </div>

        </Fragment>
    )
}

export default OrderSuccess
