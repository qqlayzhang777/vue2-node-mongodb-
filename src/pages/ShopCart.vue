<template>
	<div>
		<nav-header @init="init" @checkShow="checkShow"></nav-header>
		<nav-bread>
			<span slot="Cart">ShopCart</span>
		</nav-bread>
		<div>
			<symbol id="icon-del" viewBox="0 0 32 32">
			  <title>delete</title>
			  <path class="path1"
			        d="M11.355 4.129v-2.065h9.29v2.065h-9.29zM6.194 29.935v-23.742h19.613v23.742h-19.613zM30.968 4.129h-8.258v-3.097c0-0.569-0.463-1.032-1.032-1.032h-11.355c-0.569 0-1.032 0.463-1.032 1.032v3.097h-8.258c-0.569 0-1.032 0.463-1.032 1.032s0.463 1.032 1.032 1.032h3.097v24.774c0 0.569 0.463 1.032 1.032 1.032h21.677c0.569 0 1.032-0.463 1.032-1.032v-24.774h3.097c0.569 0 1.032-0.463 1.032-1.032s-0.463-1.032-1.032-1.032v0z"></path>
			  <path class="path2"
			        d="M10.323 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
			  <path class="path3"
			        d="M16 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
			  <path class="path4"
			        d="M21.677 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
			</symbol>
			<div class="container">
			  <div class="cart">
			    <div class="page-title-normal">
			      <h2 class="page-title-h2"><span>My Cart</span></h2>
			    </div>
			    <div class="item-list-wrap">
			      <div class="cart-item">
			        <div class="cart-item-head">
			          <ul>
			            <li>Items</li>
			            <li>Price</li>
			            <li>Quantity</li>
			            <li>Subtotal</li>
			            <li>Edit</li>
			          </ul>
			        </div>
			        <ul class="cart-item-list">
			          <li v-for="(item,index) in cartList">
			            <div class="cart-tab-1">
			              <div class="cart-item-check">
			                <a href="javascipt:;" class="checkbox-btn item-check-btn" :class="[{check:item.checked=='1'}]" @click="checkGoods(item,index)">
			                  <svg class="icon icon-ok">
			                    <use xlink:href="#icon-ok"></use>
			                  </svg>
			                </a>
			              </div>
			              <div class="cart-item-pic">
			                <img :src="'/static/img/'+item.productImage" :alt="item.productName">
			              </div>
			              <div class="cart-item-title">
			                <div class="item-name">{{item.productName}}</div>
			              </div>
			            </div>
			            <div class="cart-tab-2">
			              <div class="item-price">{{item.salePrice}}</div>
			            </div>
			            <div class="cart-tab-3">
			              <div class="item-quantity">
			                <div class="select-self select-self-open">
			                  <div class="select-self-area">
			                    <a class="input-sub" @click="changNum(item,-1)">-</a>
			                    <span class="select-ipt">{{item.productNum}}</span>
			                    <a class="input-add"  @click="changNum(item,1)">+</a>
			                  </div>
			                </div>
			              </div>
			            </div>
			            <div class="cart-tab-4">
			              <div class="item-price-total">{{item.productNum*item.salePrice | formateMoney}}</div>
			            </div>
			            <div class="cart-tab-5">
			              <div class="cart-item-opration">
			                <a href="javascript:;" class="item-edit-btn" @click="delCartGoods(item)">
			                  <svg class="icon icon-del">
			                    <use xlink:href="#icon-del"></use>
			                  </svg>
			                </a>
			              </div>
			            </div>
			          </li>
			        </ul>
			      </div>
			    </div>
			    <div class="cart-foot-wrap">
			      <div class="cart-foot-inner">
			        <div class="cart-foot-l">
			          <div class="item-all-check">
			            <a href="javascipt:;">
			                  <span class="checkbox-btn item-check-btn"  :class="[{check:checkAll}]"  @click="checkAllGoods">
			                      <svg class="icon icon-ok"><use xlink:href="#icon-ok"/></svg>
			                  </span>
			              <span @click="checkAllGoods">Select all</span>
			            </a>
			          </div>
			        </div>
			        <div class="cart-foot-r">
			          <div class="item-total">
			            Item total: <span class="total-price">{{totalPrice | formateMoney(" 元")}}</span>
			          </div>
			          <div class="btn-wrap">
			            <router-link class="btn btn--red" :to="userAddress" @click="toAddress" :class="{'btn--dis':id==0}">Checkout</router-link>
			          </div>
			        </div>
			      </div>
			    </div>
			  </div>
			</div>
		</div>
		<modal :mdAll="mdAll" @close="closeModal">
			<p slot="content" class="md-modal-text">确定要删除此件商品吗？</p>
			<span class="btn-modal" slot="goOnShopping" @click="delAgr">确 定</span>
			<span class="btn-modal" slot="goCart" @click="mdAll=false">取 消</span>
		</modal>
		<nav-footer></nav-footer>
	</div>
</template>

<style>
	.md-modal-all{
		text-align: center;
	}
	.md-modal-text{
		font-size: 20px;
		font-weight: bold;
	}
	.btn-modal{
		width: 40%;
		height: 40px;
		text-align: center;
		line-height: 40px;
		display: inline-block;
		background-color: #df3939;
		color:#fff;
		font-weight: bold;
		margin: 0 10px;
		cursor:pointer;
		transition:background-color .2s ease-in;
	}	
	.btn-modal:hover{
		background-color: red;
		color:#fff;
		transition:background-color .2s ease-in;
	}
  .input-sub,.input-add{
    min-width: 40px;
    height: 100%;
    border: 0;
    color: #605F5F;
    text-align: center;
    font-size: 16px;
    overflow: hidden;
    display: inline-block;
    background: #f0f0f0;
  }
  .item-quantity .select-self-area{
    background:none;
    border: 1px solid #f0f0f0;
  }
  .item-quantity .select-self-area .select-ipt{
    display: inline-block;
    padding:0 3px;
    width: 30px;
    min-width: 30px;
    text-align: center;
  }
</style>

<script>
	import '@/assets/css/base.css'
	import '@/assets/css/checkout.css'
	import axios from 'axios'
	import NavHeader from '@/components/NavHeader'
	import NavBread from '@/components/NavBread'
	import NavFooter from '@/components/NavFooter'
	import Modal from '@/components/Modal'
	export default {
		components: {
			NavHeader,
			NavBread,
			NavFooter,
			Modal
		},
		data () {
			return {
				cartList: [],
				forCheck: '',
				mdAll: false,
				id: '',
				delIndex: '',
				checkAll: '',
				totalPrice: 0,
				userAddress: ''
			}
		},
		mounted () {
			this.$nextTick(()=>{
				this.init()
			})
		},
		filters:{
			//金额过滤器
			formateMoney (val,type) {
				if (type == undefined) {
					type = ''
				}
				return '¥ ' + val.toFixed(2) + type
			}
		},
		computed: {

		},
		methods: {
			//请求cartList列表
			init () {
				this.id = ''
				this.totalPrice = 0
				axios.get('users/cart').then(response=>{
					let res = response.data
					if(res.status == 0){
						this.cartList = res.result
						this.cartList.forEach((item,index)=>{
							if(item.checked == 1){
								this.id++
								this.totalPrice += item.productNum*item.salePrice
								this.userAddress = 'address'
								console.log(this.id)
							}
							if(this.id == this.cartList.length){
								this.checkAll = true
							}
						})
					}else{
						this.cartList = []
						this.userAddress = ''
						console.log('获取失败，可能未登录')
					}
				})
			},
			//商品选中事件
			checkGoods (item, index) {
				if(item.checked == 1){
					this.forCheck = true
				}else{
					this.forCheck = false
				}
				this.forCheck = !this.forCheck
				if(!this.forCheck){
					item.checked = 0
					this.checkAll = false
					if(this.id>=1){
						this.id--
						if(this.id == 0){
							this.userAddress = ''
						}
						console.log(this.id)
					}
				}else{
					item.checked = 1
					this.id++
					this.userAddress = 'address'
					console.log(this.id)
					if(this.id == this.cartList.length){
						this.checkAll = true
					}
				}
				this.saveCartList()
				this.totalPriceShow()
			},
			//改变商品数量
			changNum (item,num) {
				if(num<0){
					if(item.productNum>=2){
						item.productNum--
					}
				}else{
					item.productNum++
				}
				if(item.checked == 0){
					item.checked = 1
					this.id++
					if(this.id == this.cartList.length){
						this.checkAll = true
					}
					this.userAddress = 'address'

				}
				console.log(this.id)
				this.saveCartList()
				this.totalPriceShow()
			},
			//保存cartList到服务器
			saveCartList () {
				axios.post('/users/cart', {cartList:this.cartList}).then(response=>{
					let res = response.data
					if(res.status == 0){
						
					}
				})
			},
			//点击删除按钮
			delCartGoods (item) {
				this.mdAll = true
				this.delItem = item
			},
			closeModal () {
				this.mdAll = false
			},
			//确认删除商品
			delAgr () {
				var _index = this.cartList.indexOf(this.delItem)
				this.mdAll = false
				if(this.delItem.checked == 1){
					if(this.id>=1){
						this.id--
						if(this.id == 0){
							this.userAddress = ''
						}
					}
				}
				this.cartList.splice(_index, 1)
				if(this.id == this.cartList.length){
					this.checkAll = true
				}
				if(this.cartList.length == 0){
					this.checkAll = false
				}
				console.log(this.id)
				this.saveCartList()
				this.totalPriceShow()
			},
			//全选和取消全选
			checkAllGoods () {
				if(this.cartList.length == 0){
					this.checkAll = false
					this.userAddress = ''
				}else{
					this.checkAll = !this.checkAll
				}
				this.cartList.forEach((item, index)=>{
					if(this.checkAll){
						item.checked = 1
						this.forCheck = true
						this.id = this.cartList.length
						console.log(this.id)
						this.userAddress = 'address'
					}else{
						item.checked = 0
						this.forCheck = false
						this.id = 0
						console.log(this.id)
						this.userAddress = ''
					}
					this.saveCartList()
				})
				this.totalPriceShow()
			},
			// header组件登出后执行
			checkShow () {
				this.id = ''
				this.checkAll = false
				this.totalPrice = 0
				this.userAddress = ''
			},
			// cart总价格计算
			totalPriceShow () {
				this.totalPrice = 0
				this.cartList.forEach((item,index)=>{
					if(item.checked == 1){
						this.totalPrice += item.productNum*item.salePrice
					}
				})
			},
			//跳转到地址列表
			toAddress () {
				this.checklog()
			},
			checkLog () {
			  axios.get('/users/checkLogin').then(response=>{
			    let res = response.data
			    if(res.status == '0'){
			      this.userAddress = 'address'
			    }
			  })
			}
		}
	}
</script>