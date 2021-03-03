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
  },
  registre_request(state) {
    state.status = 'loading'
  },
  register_success(state) {
    state.status = 'success'
  },
  logout(state) {
    state.status = '',
    state.token = '',
    state.user = ''
  },
  profile_request(state) {
    state.status = 'loading'
  },
  user_profile(state, user) {
    state.user = user
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
  },
  async register({commit}, userData) {
    commit('registre_request')
    let res = await axios.post('http://localhost:8100/api/users/register', userData)
    if (res.data.success !== undefined) {
      commit('register_success')
    }
    return res
  },
  async getProfile({commit}) {
    commit('profile_request')
    let res = await axios.get('http://localhost:8100/api/users/profile')
    commit('user_profile', res.data.user)
    return res
  },
  // Logout
  async logout({commit}) {
    await localStorage.removeItem('token')
    commit('logout')
    delete axios.defaults.headers.common['Authirization']
    router.push('/login')
    return
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}