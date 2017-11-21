let mongoose = require("mongoose")
// Schema 为定义表(集合)模型的对象
let Schema = mongoose.Schema
// 定义商品模型
let productSchema = new Schema({
	"productId":String,
	"productName":String,
	"salePrice":Number,
	"productImage":String,
	"productNum":String,
	"checked":String
})

module.exports = mongoose.model("Good",productSchema)
// module.exports = mongoose.model("Good", productSchema, "goods") 
// 若集合名后没有s需加集合名参数
