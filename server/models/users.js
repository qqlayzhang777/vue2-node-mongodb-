let mongoose = require("mongoose")

let userSchema = new mongoose.Schema({
	"userId":String,
	"userName":String,
	"userPwd":String,
	"orderList":Array,
	"cartList":[
		{
			"productId":String,
			"productName":String,
			"salePrice":String,
			"productNum":Number,
			"productImage":String,
			"checked":String
		}
	],
	"addressList":Array
})

module.exports = mongoose.model("User", userSchema)