<template>
  <div>
    <div class="row">
      <div class="card mx-auto mt-5">
        <p v-if="error" v-html="error"></p>
        <div class="card-header text-white bg-primary">
          Login
        </div>
        <form class="mt-5" @submit.prevent="loginUser">
          <div class="form-group">
            <label for="exampleInputPassword1">Login</label>
            <input 
              type="login" 
              class="form-control" 
              id="exampleInputPassword1"
              v-model="login"
            >
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input 
              type="password" 
              class="form-control" 
              id="exampleInputPassword1"
              v-model="password"
            >
          </div>
          <button type="submit" class="btn btn-primary">sign in</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
  export default {
    data: () => ({
      login: '',
      password: '',
      error: null
    }),
    methods: {
      ...mapActions(['auth']),
      loginUser() {
        const user = {
          login: this.login,
          password: this.password
        }
        this.auth(user)
        .then(res => {
          if (res.data.success) {
            this.$router.push('/profile')
          }
        })
        .catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>

<style scoped>
.card{
  width: 60%;
}
</style>