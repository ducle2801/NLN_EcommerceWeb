const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');


exports.lookUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // Checks if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler('Email và Mật khẩu không được để trống', 400))
    }

    // Finding user in database
    const user = await User.findOne({ email }).select('+password')


    if (!user) {
        return next(new ErrorHandler('Email không tồn tại', 401));
    }

    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Mật khẩu không đúng', 401));
    }

    if(user.role === "look"){
        return next(new ErrorHandler("Tài khoản của bạn đã bị khóa. Vui lòng liên hệ với quản trị viên!"))
    }
    next()
})