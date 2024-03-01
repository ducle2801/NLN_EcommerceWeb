import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'

import { useSelector } from 'react-redux'

const ConfirmOrder = ({ history }) => {

    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)

    // Calculate Order Prices
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) // giống giống như for, foreach
    const shippingPrice = itemsPrice > 100000 ? 0 : 10000 // tính tiền ship
    const taxPrice = Number((0.01 * itemsPrice)) // tính thuế
    const totalPrice = (itemsPrice + shippingPrice + taxPrice) // tổng tiền

    const processToPayment = () => {
        const data = {
            itemsPrice: itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        }

        sessionStorage.setItem('orderInfo', JSON.stringify(data)) // push session order Info
        history.push('/payment')
    }

    return (
        <Fragment>

            <MetaData title={'Xác nhận hóa đơn'} />

            <CheckoutSteps shipping confirmOrder />

            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-confirm">

                    <h4 className="mb-3">Thông tin vận chuyển</h4>
                    <p><b>Tên khách hàng:</b> {user && user.name}</p>
                    <p><b>Số điện thoại:</b> {shippingInfo.phoneNo}</p>
                    <p className="mb-4"><b>Địa chỉ:</b> {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}</p>

                    <hr />
                    <h4 className="mt-4">Các mặt hàng trong giỏ hàng của bạn:</h4>

                    {cartItems.map(item => (
                        <Fragment>
                            <hr />
                            <div className="cart-item my-1" key={item.product}>
                                <div className="row">
                                    <div className="col-4 col-lg-2">
                                        <img src={item.image} alt="Laptop" height="45" width="65" />
                                    </div>

                                    <div className="col-5 col-lg-6">
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </div>

                                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                        <p>{item.quantity} x {(item.price).toLocaleString()}đ = <b>{(item.quantity * item.price).toLocaleString()}đ</b></p>
                                    </div>

                                </div>
                            </div>
                            <hr />
                        </Fragment>
                    ))}



                </div>

                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Tổng giá trị đơn hàng</h4>
                        <hr />
                        <p>Thành tiền:  <span className="order-summary-values">{(itemsPrice).toLocaleString()}đ</span></p>
                        <p>Phí vận chuyển: <span className="order-summary-values">{(shippingPrice).toLocaleString()}đ</span></p>
                        <p>Thuế:  <span className="order-summary-values">{(taxPrice).toLocaleString()}đ</span></p>

                        <hr />

                        <p>Tổng tiền: <span className="order-summary-values">{(totalPrice).toLocaleString()}đ</span></p>

                        <hr />
                        <button id="checkout_btn" className="btn btn-primary btn-block" onClick={processToPayment}>Tiến hành thanh toán</button>
                    </div>
                </div>


            </div>

        </Fragment>
    )
}

export default ConfirmOrder
