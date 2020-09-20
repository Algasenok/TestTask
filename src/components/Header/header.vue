<template>
  <div>
    <div class='header_block'>
      <div class="logo">
        <router-link :to="{name: 'HomePage'}">
          <img src="../../images/screenshot_5.jpg" class='graficlogo' alt="Главная">
        </router-link>
      </div>
      <div class='auth'>
        <div v-if='authList.loggIn' class='welcome'>
          <div>
            Добро пожаловать, {{authList.log}}!
          </div>
          <div class='login_button logout'>
            <button id="LogOut" @click="LogOut">Выйти</button>
          </div>
        </div>
        <div v-if='!authList.loggIn' class="login_button">
          <div class='auth_button'>
            <button id="Registration" @click="RegOpen">Регистрация</button>
            <Registration v-if="RModal" @close="RegClose"> </Registration>
          </div>
          <div class='auth_button'>
            <button id="authorization" @click="AuthOpen">Авторизация</button>
            <Authorization v-if="AModal" @close="AuthClose"> </Authorization>
          </div>
        </div>
      </div>
    </div>
    <nav>
      <div class="navpage">
        <router-link :to="{name: 'HomePage'}" class="header__link">
          ГЛАВНАЯ
        </router-link>
        <router-link :to="{name: 'SinglePage'}" class="header__link">
          ЗАПИСЬ
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script>

  import Registration from "../Registration/index.vue";
  import Authorization from "../Authorization/index.vue";

  export default {
    name: "Header",
    components: {
      Registration, Authorization
    },
    computed: {
      authList() {
        return {
          loggIn: this.$store.getters.IS_LOGG_IN,
          log: this.$store.getters.GET_USER_NAME
        }
      },
    },
    data(){
      return {
        RModal: false,
        AModal: false,
      }
    },
    methods: {
      AuthOpen(){
          this.RModal = false,
          this.AModal = true
      },
      AuthClose(){
        this.AModal = false
      },
      RegOpen(){
          this.RModal = true,
          this.AModal = false
      },
      RegClose(){
        this.RModal = false
      },
      LogOut(){
        this.$store.dispatch('LOGOUT');
      }
    }
  };

</script>

<style></style>
