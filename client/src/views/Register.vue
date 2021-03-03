<template>
  <div>
    <div class="row">
      <div class="card mx-auto mt-5">
        <div class="card-header text-white bg-primary">
          Register
        </div>
        <form class="mt-5">
          <div class="form-group">
            <label for="exampleInputEmail1">Username</label>
            <input 
              type="email" 
              class="form-control" 
              id="exampleInputEmail1" 
              aria-describedby="emailHelp"
              v-model="username"
            >
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Email</label>
            <input 
              type="email" 
              class="form-control" 
              id="exampleInputPassword1"
              v-model="email"
            >
          </div>
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
          <div class="form-group">
            <label for="exampleInputPassword1">Confirm password</label>
            <input 
              type="password" 
              class="form-control" 
              id="exampleInputPassword1"
              v-model="confirm_password"
            >
          </div>
          <button type="submit" class="btn btn-primary">Sign</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      username: '',
      email: '',
      login: '',
      password: '',
      confirm_password: ''
    })
  }
</script>

<style scoped>
.card{
  width: 60%;
}
</style>