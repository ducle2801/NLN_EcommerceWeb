import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTableV5 } from 'mdbreact';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { myOrders, clearErrors } from '../../actions/orderActions';

const ListOrders = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(myOrders());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: 'ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Số lượng',
          field: 'numOfItems',
          sort: 'asc',
        },
        {
          label: 'Tổng tiền',
          field: 'amount',
          sort: 'asc',
        },
        {
          label: 'Trạng thái',
          field: 'status',
          sort: 'asc',
        },
        {
          label: 'Hành động',
          field: 'actions',
          sort: 'asc',
        },
      ],
      rows: [],
    };

    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `${order.totalPrice.toLocaleString()}đ`,
        status:
          order.orderStatus &&
          String(order.orderStatus).includes('Đã giao hàng') ? (
            <p style={{ color: 'green' }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: 'red' }}>{order.orderStatus}</p>
          ),
        actions: (
          <Link to={`/order/${order._id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </Link>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={'Đơn hàng của tôi'} />

      <h1 className="my-5">Đơn hàng của tôi</h1>

      {loading ? (
        <Loader />
      ) : (
        <MDBDataTableV5
          data={setOrders()}
          className="px-3"
          bordered
          striped
          hover
        />
      )}
    </Fragment>
  );
};

export default ListOrders;
