<template>
  <div class="singlepage">
    <h1>{{dataList.article.head}} </h1>
    <div id='text' ></div>

    <div class='comment_head'>
      <h2>Комментарии:</h2>
    </div>
    <div v-for='value in dataList.comments'>
      <div class='comment_print'>
        <div class='head_comment'>
          <div class='login'><b>{{value.login}}</b></div>
          <div class='date'>
            <i>
              {{EditDate(value.date)}}
            </i>
          </div>
        </div>
        <div class='text_comment'>{{value.text}}</div>
      </div>
    </div>
    <div v-if='!dataList.loggIn'><b><i>!!!Чтобы оставить комментарий, пожалуйста, авторизуйтесь на сайте!!!</i></b></div>
    <a v-if='dataList.loggIn' @click='add_comment'>Добавить комментарий</a>
    <CommentForm v-if="comment"> </CommentForm>
  </div>
</template>


<script>

import CommentForm from "../../components/CommentForm/index.vue";

export default {
  name: "SinglePage",
  components: {
    CommentForm,
  },
  computed: {
    dataList() {
      return {
        article: this.$store.getters.GET_ARTICLE,
        comments: this.$store.getters.GET_COMMENTS,
        loggIn: this.$store.getters.IS_LOGG_IN,
      }
    }
  },
  data(){
    return {
      comment: false,
    }
  },
  methods: {
    PasteText(){
      let d = document.getElementById('text');
      d.insertAdjacentHTML('beforeend', this.$store.getters.GET_ARTICLE.text);
    },
    add_comment(){
      this.comment = !this.comment
    },
    EditDate(date){
      date = new Date(date);
      let minutes = date.getMinutes();
      let hours = date.getHours();

      if (0<=minutes && minutes<=9){
        minutes = '0' + String(date.getMinutes());
      };
      if (0<=hours && hours<=9){
        hours = '0' + String(date.getHours());
      };

      return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}  ${hours}:${minutes}`;
    }
  },
  mounted() {
    this.PasteText();
  }
};
</script>

<style></style>
