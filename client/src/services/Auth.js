import axios from 'axios'
import router from '../router'

const state = {
  token: localStorage.getItem('token') || '',
  user: {},
  status: ''
} 

const getters = {
  isLoggedIn: state => !!state.token,
  authState: state => state.status,
  user: state => state.user
}

const mutations = {
  auth_request(state) {
    state.status = 'Loading..'
  },
  auth_success(state, token, user) {
    state.token = token,
    state.user = user,
    state.status = 'scuccess'
  }
}

const actions = {
  async auth({commit}, user) {
    commit('auth_request')
    let res = await axios.post('http://localhost:8100/api/users/login', user)
    if (res.data.success) {
      const token = res.data.token
      const user = res.data.user
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authirization'] = token
      commit('auth_success', token, user)
    }
    return res
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}