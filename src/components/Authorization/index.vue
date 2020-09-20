<template>
  <div class="modal_window">
    <div class="modal">
      <div class='modal_form'>
        <div class="close">
          <a @click=" $emit('close')" class='close_modal'>
            Закрыть
          </a>
        </div>
        <form class="form-login">
          <div class="form-group">
            <label for="InputLogin">Введите логин</label>
            <input v-model='login_auth' type="text" class="form-control" id="InputLogin">
          </div>
          <div class="form-group">
            <label for="InputPassword1">Пароль</label>
            <input v-model='password_auth' type="password" class="form-control" id="InputPassword1">
          </div>

          <button @click="write_auth" type="submit" class="btn btn-primary">Войти</button>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
export default{
  name: "Authorization",
  data(){
    return {
      login_auth: '',
      password_auth: ''
    }
  },

  methods: {
    write_auth(){
      let login = this.login_auth;
      let password = this.password_auth;
      this.$store.dispatch('LOGIN_AUTH', {login: login, password: password});
    },
  },
};
</script>

<style>

</style>
