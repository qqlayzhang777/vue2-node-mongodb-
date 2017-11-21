// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import LazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import {currency} from '@/util/currency'

Vue.use(Vuex)
Vue.use(LazyLoad, {
	loading: '/static/loading/loading-bubbles.svg'
})
Vue.use(infiniteScroll)
Vue.filter('currency', currency)

Vue.config.productionTip = false

// 自定义指令
Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
})

var store = new Vuex.Store({
	state: {
		userName: '',
		cartCount: 0
	},
	mutations: {
		userNameMuta (state,nam) {
			state.userName = nam
		},
		cartCountMuta (state,num) {
			state.cartCount += num
		}
	}
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
