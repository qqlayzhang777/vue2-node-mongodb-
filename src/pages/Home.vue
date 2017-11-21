<template>
	<div>
		<nav-header></nav-header>
		<nav-bread>
			<span slot="Goods">Goods</span>
		</nav-bread>
		<div class="accessory-result-page accessory-page">
		  <div class="container">
		    <div class="filter-nav">
		      <span class="sortby">Sort by:</span>
		      <a href="javascript:void(0)" class="default cur" @click="sortDefault">Default</a>
		      <a href="javascript:void(0)" class="price" @click="sortPrice">Price <svg class="icon icon-arrow-short" :class="[{sortUp:!sortFlag}]"><use xlink:href="#icon-arrow-short"></use></svg></a>
		      <a href="javascript:void(0)" class="filterby stopPop" @click="filterShow=true">Filter by</a>
		    </div>
		    <div class="accessory-result">
		      <!-- filter -->
		      <div class="filter stopPop" id="filter" :class="{'filterby-show':filterShow}">
		        <dl class="filter-price">
		          <dt>Price:</dt>
		          <dd><a href="javascript:void(0)" :class="{cur:priceSelect=='all'}" @click="priceAll();filterShow=false;">All</a></dd>
		          <dd v-for="(item,index) in priceRoom">
		            <a href="javascript:void(0)" :class="{cur:priceSelect==index}" @click="priceSelectFilter(index);filterShow=false">{{item}}</a>
		          </dd>
		        </dl>
		      </div>
		      <div :class="{'md-overlay':filterShow}" @click="filterShow=false"></div>

		      <!-- search result accessories list -->
		      <div class="accessory-list-wrap">
		        <div class="accessory-list col-4">
		          <ul>
		            <li v-for="(item,index) in goodsList">
		              <div class="pic">
		                <a href="#"><img v-lazy="'/static/img/'+item.productImage" :alt="item.productName"></a>
		              </div>
		              <div class="main">
		                <div class="name">{{item.productName}}</div>
		                <div class="price">{{item.salePrice}}</div>
		                <div class="btn-area">
		                  <a href="javascript:;" class="btn btn--m" @click="joinCar(item.productId)">加入购物车</a>
		                </div>
		              </div>
		            </li>
		          </ul>
		          <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" class="loadmore">
		            <img src="../../static/loading/loading-spinning-bubbles.svg" v-if="loading">
		          </div>
		        </div>
		      </div>
		    </div>
		  </div>
		</div>
		<modal class="md-modal-all" :mdAll="mdAll" @close="closeModal">
			<p slot="content" class="md-modal-text" v-if="!mdSel">加入购物车失败，请先登录</p>
			<p slot="content" class="md-modal-text" v-if="mdSel">
				<svg class="icon-status-ok">
				  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
				</svg>
				加入购物车成功
			</p>
			<span slot="sure" class="btn-modal" v-if="!mdSel" @click="mdAll=false">确 定</span>
			<span slot="goOnShopping" class="btn-modal" v-if="mdSel" @click="mdAll=false">继续购物</span>
			<router-link slot="goCart" class="btn-modal" to="cart" v-if="mdSel">查看购物车</router-link>
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
</style>

<script>
import axios from 'axios'
import '../assets/css/base.css'
// import '../assets/css/login.css'
import '../assets/css/product.css'
// import '../assets/css/checkout.css'

import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import NavBread from '@/components/NavBread'
import Modal from '@/components/Modal'
	
export default {
	components: {
		NavHeader,
		NavFooter,
		NavBread,
		Modal
	},
	data () {
		return {
			priceRoom: [
				'0 - 100',
				'100 - 1800',
				'1800 - 8800'
			],
			priceSelect: 'all',
			goodsList: [],
			filterShow: false,
			sortFlag: true,
			page: 1,
			pageSize: 8,
			busy: true,
			reqData: true,
			loading: false,
			mdAll: false,
			mdSel: false
		}
	},
	computed: {

	},
	mounted () {
		this.$nextTick(()=>{
			this.getGoodsList()
		})
	},
	methods: {
		getGoodsList (flag) {
			var param = {
				page: this.page,
				pageSize: this.pageSize,
				sort: this.sortFlag?1:-1,
				priceLevel: this.priceSelect
			}
			this.loading = true
			// 需要做一个代理跨域
			// 在config/index最下面
			axios.get('/goods/list',{params:param}).then(res=>{
				this.loading = false
				// var res = response.data
				if(res.data.status == '0'){
					if(flag){
						this.goodsList = this.goodsList.concat(res.data.result.list)
						if(res.data.result.count < this.pageSize){
							this.busy = true
							this.reqData = false
						}else{
							this.busy = false
						}
					}else{
						this.goodsList = res.data.result.list
						this.busy = false
					}
				}else{
					this.goodsList = []
				}
			})
		},
		sortPrice () {
			this.sortFlag = !this.sortFlag
			this.reqData = true
			this.page = 1
			this.getGoodsList()
		},
		sortDefault () {
			this.page = 1
			this.reqData = true
			this.sortFlag = 'round'
			this.getGoodsList()
		},
		loadMore () {
			this.busy = true
			if(this.reqData){
				setTimeout(()=>{
					this.page++
					this.getGoodsList(true)
					this.busy = false
				},500)
			}else{
				return false
			}
		},
		priceSelectFilter (index) {
			this.priceSelect = index
			this.page = 1
			this.getGoodsList()
		},
		priceAll () {
			this.reqData = true
			this.page = 1
			this.goodsList = []
			this.priceSelect = 'all'
			this.getGoodsList()
		},
		joinCar (productId) {
			this.mdAll = true
			axios.post('/goods/addCart', {productId:productId}).then(res=>{
				if(res.data.status == '0'){
					this.mdSel = true
					// alert("加入成功")
				}else{
					this.mdSel = false
					// alert("error: " + res.data.msg)
				}
			})
		},
		closeModal () {
			this.mdAll = false
		}
	}
}
</script>