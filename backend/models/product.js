const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tên sản phẩm không được để trống'],
        trim: true,
        maxLength: [100, 'Tên sản phẩm không được vượt quá 100 ký tự']
    },
    price: {
        type: Number,
        required: [true, 'Giá không được để trống'],
        maxLength: [7, 'Giá không được vượt quá 7 ký tự'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Mô tả không được để trống'],
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],
    category: {
        type: String,
        required: [true, 'Vui lòng chọn danh mục cho sản phẩm này'],
        enum: {
            values: [
                'Rau-Củ-Trái cây',
                'Thịt-Trứng-Hải sản',
                'Thực phẩm chế biến',
                'Thực phẩm đông lạnh',
                'Thực phẩm Khô - Gia Vị',
                'Bánh kẹo - Đồ ăn vặt',
                "Sữa - Sản phẩm từ sữa",
                'Đồ uống - Giải khát',
                'Hóa Mỹ phẩm',
                'Chăm sóc cá nhân',
                'Chăm sóc mẹ và bé',
                'Thể thao'
            ],
            message: 'Vui lòng chọn đúng danh mục cho sản phẩm'
        }
    },
    seller: {
        type: String,
        required: [true, 'Vui lòng nhập người bán sản phẩm']
    },
    stock: {
        type: Number,
        required: [true, 'Số lượng không được để trống'],
        maxLength: [5, 'Số lượng không được vượt quá 5 ký tự'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Product', productSchema);