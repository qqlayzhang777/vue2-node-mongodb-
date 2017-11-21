let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')
var Goods = require('../models/goods')
var Users = require('../models/users')

// 通过mongoose连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/vue2-node-md',{useMongoClient:true})
// 监听数据库是否连接成功
mongoose.connection.on("connected", ()=>{
	console.log("MongoDB connected success.")
})
// 数据库连接失败，监听error
mongoose.connection.on("error", ()=>{
	console.log("MongoDB connected fail")
})
// 监听mongodb的连接是否断开
mongoose.connection.on("disconnected", ()=>{
	console.log("MongoDB connected disconnected")
})

// 商品列表排序和分页
router.get('/list', (req, res, next)=>{
	// res.send("hello,goods list.")
	let page = parseInt(req.param("page"))
	let pageSize = parseInt(req.param("pageSize"))
	let sort = req.param("sort")  //排序
	let skip = (page-1)*pageSize  //跳过商品数量
	let params = {}
	//商品价格阶级
	let priceLevel = req.param("priceLevel") 
	var priceGt = ''.priceLte = ''
	if(priceLevel != 'all'){
		switch (priceLevel){
			case '0':priceGt = 0;priceLte = 100;break
			case '1':priceGt = 100;priceLte = 1800;break
			case '2':priceGt = 1800;priceLte = 8800;break
		}
		params = {
			salePrice: {
				$gt: priceGt,    // 大于
				$lte: priceLte   //小于等于	
			}
		}
	}
	let goodsModel = Goods.find(params).skip(skip).limit(pageSize)
	goodsModel.sort({salePrice:sort})
	goodsModel.exec((err, doc)=>{
		if(err){
			res.json({
				status: 1,
				msg: err.message
			})
		}else{
			res.json({
				status: 0,
				msg: '',
				result: {
					count: doc.length,
					list: doc
				}
			})
		}
	})
})

// 加入购物车  检查是否登录(涉及到vuex)
router.post('/addCart', (req, res, next)=>{
	var userId = req.cookies.userId,productId = req.body.productId
	Users.findOne({userId:userId}, (err, userDoc)=>{
		if(err){
			res.json({
				status: '1',
				msg: err.message
			})
		}else{
			if(userDoc){
				let goodsItem = ''
				userDoc.cartList.forEach(function(item){
					if(item.productId == productId){
						goodsItem = item
						item.checked = 1
						item.productNum++
					}
				})
				if(goodsItem){
					userDoc.save((err2,doc2)=>{
						if(err2){
							res.json({
								status: '1',
								msg: err2.message
							})
						}else{
							res.json({
								status: '0',
								msg: '',
								result: 'suc'
							})
						}
					})
				}else{
					Goods.findOne({productId:productId}, (err1,doc1)=>{
						if(err1){
							res.json({
								status: '1',
								msg: err1.message
							})
						}else{
							if(doc1){
								doc1.checked = 1
								doc1.productNum = 1
								userDoc.cartList.push(doc1)
								userDoc.save((err2,doc2)=>{
									if(err2){
										res.json({
											status: '1',
											msg: err2.message
										})
									}else{
										res.json({
											status: '0',
											msg: '',
											result: 'suc'
										})
									}
								})
							}
						}
					})
				}
			}
		}
	})
})

module.exports = router