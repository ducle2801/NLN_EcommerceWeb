const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Process stripe payments   =>   /api/v1/payment/process
exports.processPayment = catchAsyncErrors(async (req, res, next) => {

    const paymentIntent = await stripe.paymentIntents.create({ // create content payment
        amount: req.body.amount,
        currency: 'vnd',

        metadata: { integration_check: 'accept_a_payment' } // Các đối tượng Stripe có thể cập nhật — bao gồm Tài khoản , Khoản phí , Khách hàng , Nội dung thanh toán , Tiền hoàn lại , Đăng ký và Chuyển khoản —có thông số. 
    });

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret // Json API client_secret
    })

})

// Send stripe API Key   =>   /api/v1/stripeapi
exports.sendStripApi = catchAsyncErrors(async (req, res, next) => {

    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })

})