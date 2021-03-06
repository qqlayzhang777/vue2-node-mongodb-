var express = require('express');
var path = require('path');
//favicon浏览器网页标签显示的图标
var favicon = require('serve-favicon');
//日志输出
var logger = require('morgan');
//获取cookie信息，进行转换
var cookieParser = require('cookie-parser');
//对响应返回值进行转换
var bodyParser = require('body-parser');
var ejs = require('ejs')

//渲染首页的路由
var index = require('./routes/index');
//渲染用户模块的路由
var users = require('./routes/users');

var goods = require('./routes/goods');

var app = express();

// view engine setup 视图引擎设置
app.set('views', path.join(__dirname, 'views'));
// 
ejs
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
// urlencoded 对url进行编码
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res,next)=>{
	if(req.cookies.userId){
		next()
	}else{
		//req.originalUrl.indexOf('/goods/list') > -1  || req.path == '/goods/list'
		if(req.originalUrl == '/users/login' || req.originalUrl == '/users/logout' || req.path == '/goods/list'){
			next()
		}else{
			res.json({
				status: '10001',
				msg: '当前未登录',
				result: ''
			})
		}
	}
})

app.use('/', index);
app.use('/users', users);

app.use('/goods', goods);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
