var express = require('express');
var router = express.Router();
var Users = require('../models/users')
require('../util/util')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', (req, res, next)=>{
	var param = {
		userName:req.body.userName,
		userPwd:req.body.userPwd
	}
	Users.findOne(param, (err, doc)=>{
		if(err){
			res.json({
				status: '1',
				msg: err.message
			})
		}else{
			if(doc){
				res.cookie('userId', doc.userId, {
					path: '/',  //cookie路径
					maxAge: 1000*60*60  //cookie周期
				})
				res.cookie('userName', doc.userName, {
					path: '/',  //cookie路径
					maxAge: 1000*60*60  //cookie周期
				})
				//通过req存到session给父子页面公用
				// req.session
				res.json({
					status: '0',
					msg: '',
					result: {
						userName:doc.userName,
						cartList: doc.cartList,
						orderList: doc.orderList,
						addressList: doc.addressList
					}
				})
			}else{
				res.json({
					status: '2',
					msg: '用户名或密码错误',
					think: '再想想'
				})
			}
		}
	})
})

//登出操作
router.post('/logout', (req, res, next)=>{
	res.cookie("userId", "", {
		path: '/',
		maxAge: -1
	})
	res.cookie("userName", "", {
		path: '/',
		maxAge: -1
	})
	res.json({
		status: '0',
		msg: '',
		result: ''
	})
})

//登录检查
router.get('/checkLogin', (req, res, next)=>{
	if(req.cookies.userId){
		res.json({
			status: '0',
			msg: '',
			result: req.cookies.userName || ''
		})
	}else{
		res.json({
			status: '1',
			msg: '未登录',
			result: ''
		})
	}
})
//购物车列表
router.get('/cart', (req, res, next)=>{
	var param = {
		userId:req.cookies.userId
	}
	Users.findOne(param, (err, doc)=>{
		if(err){
			res.json({
				status: '1',
				msg: '可能是未登录'
			})
		}else{
			if(doc){
				res.json({
					status: '0',
					msg: '',
					result: doc.cartList
				})
			}
		}
	})
})
//保存购物车列表
router.post('/cart', (req, res, next)=>{
	var cartList = req.body.cartList
	Users.findOne({userId:req.cookies.userId}, (err, doc)=>{
		if(err){
			res.json({
				status: '1',
				msg: '未登录'
			})
		}else{
			if(doc){
				doc.cartList = cartList
				doc.save((err, doc)=>{
					if(err){
						res.json({
							status: '1',
							msg: err.message
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
})
//获取地址列表
router.get('/address', (req, res, next)=>{
	Users.findOne({userId:req.cookies.userId}, (err, doc)=>{
		if(err){
			res.json({
				status: '1',
				msg: '可能是未登录'
			})
		}else{
			if(doc){
				res.json({
					status: '0',
					msg: '',
					result: doc.addressList
				})
			}
		}
	})
})
//保存地址列表
router.post('/address', (req, res, next)=>{
	var addressList = req.body.addressList
	Users.findOne({userId:req.cookies.userId}, (err, doc)=>{
		if(err){
			res.json({
				status: '1',
				msg: '可能是未登录'
			})
		}else{
			if(doc){
				doc.addressList = addressList
				doc.save((err, doc)=>{
					if(err){
						res.json({
							status: '1',
							msg: '可能是未登录'
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
})

//获取订单列表
router.post('/createOrder', (req, res, next)=>{
	var param = req.body.params, addInf = {}
	Users.findOne({userId:req.cookies.userId}, (err, doc)=>{
		if(err){
			res.json({
				status: '1',
				msg: '可能是未登录'
			})
		}else{
			if(doc){
				doc.addressList.forEach((item,index)=>{
					if(param.addressId == item.addressId){
						addInf = item
					}
				})
				//生成随机的orderId
				var platform = '622'
				var r1 = Math.floor(Math.random()*10)
				var r2 = Math.floor(Math.random()*10)
				var sysDate = new Date().Format('yyyyMMddhhmmss')
				//生成订单日期
				var createDate = new Date().Format('yyyy-MM-dd hh:mm:ss')
				var orderId = platform + r1 + sysDate + r2

				//新生成的order
				var newOrder = {
					orderId: orderId,
					orderTotal: param.orderTotal,
					addressInfo: addInf,
					goodsList: param.goodsList,
					orderStatus: 1,
					createDate: createDate
				}
				doc.orderList.push(newOrder)
				doc.save((err,doc)=>{
					if(err){
						res.json({
							status: '1',
							msg: '可能是未登录'
						})
					}else{
						res.json({
							status: '0',
							msg: '',
							result: {
								orderId: newOrder.orderId,
								orderTotal: newOrder.orderTotal,
								orderList: doc.orderList
							}
						})
					}
				})
			}	
		}
	})
})

router.get('/newOrder', (req, res, next)=>{
	var orderId = req.param('orderId'),
	orderTotal = 0
	Users.findOne({userId:req.cookies.userId}, (err,doc)=>{
		if(err){
			res.json({
				status: '1',
				msg: 'err.message',
				result: ''
			})
		}else{
			doc.orderList.forEach((item,index)=>{
				if(orderId == item.orderId){
					orderTotal = item.orderTotal
				}
			})
			res.json({
				status: '0',
				msg: '',
				result: {
					orderId: orderId,
					orderTotal: orderTotal
				}
			})
		}
	})
})

module.exports = router;
