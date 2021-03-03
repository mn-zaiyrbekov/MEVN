import Vue from 'vue'
import Vuex from 'vuex'
import Auth from '../services/Auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Auth
  },
})
