import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import ShopCart from '@/pages/ShopCart'
import Address from '@/pages/Address'
import Order from '@/pages/Order'
import OrderSuccess from '@/pages/OrderSuccess'

Vue.use(Router)

export default new Router({
	// mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
  	{
  		path: '/cart',
  		name: 'ShopCart',
  		component: ShopCart
  	},
    {
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/orderSuccess',
      name: OrderSuccess,
      component: OrderSuccess
    }
  ]
})
