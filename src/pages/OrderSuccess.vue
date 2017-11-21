<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span slot="Cart">OrderSuccess</span>
    </nav-bread>
    <div class="container">
      <div class="page-title-normal">
        <h2 class="page-title-h2"><span>check out</span></h2>
      </div>
      <!-- 进度条 -->
      <div class="check-step">
        <ul>
          <li class="cur"><span>Confirm</span> address</li>
          <li class="cur"><span>View your</span> order</li>
          <li class="cur"><span>Make</span> payment</li>
          <li class="cur"><span>Order</span> confirmation</li>
        </ul>
      </div>

      <div class="order-create">
        <div class="order-create-pic"><img src="/static/img/ok-2.png" alt=""></div>
        <div class="order-create-main">
          <h3>Congratulations! <br>Your order is under processing!</h3>
          <p>
            <span>Order ID：{{orderId}}</span>
            <span>Order total：{{orderTotal | currency('$ ')}}</span>
          </p>
          <div class="order-create-btn-wrap">
            <div class="btn-l-wrap">
              <router-link to="/cart" class="btn btn--m">Cart List</router-link>
            </div>
            <div class="btn-r-wrap">
              <router-link to="/" class="btn btn--m">Goods List</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <modal :mdAll="mdAll" @close="closeModal">
      <p slot="content" class="md-modal-text">确定要删除这个地址吗？</p>
      <span class="btn-modal" slot="goOnShopping" @click="delAgr">确 定</span>
      <span class="btn-modal" slot="goCart" @click="mdAll=false">取 消</span>
    </modal> -->
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
        orderId: '00000000000000',
        orderTotal: '0000'
      }
    },
    mounted () {
      this.$nextTick(()=>{
        this.orderGet()
      })
    },
    computed: {
      
    },
    methods: {
      closeModal () {
        this.mdAll = false
      },
      orderGet () {
        var orderId = this.$route.query.orderId
        if(!orderId){
          return
        }
        axios.get('users/newOrder',{params:{orderId:orderId}}).then(response=>{
          var res = response.data
          if(res.status == 0){
            this.orderId = res.result.orderId
            this.orderTotal = res.result.orderTotal
          }else{
            console.log('出错了')
          }
        })
      }
    }
  }
</script>