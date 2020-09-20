<template>
  <div>
    <div class="comment_modal">
        <form class="form-comment">
          <div>

            <div><label for="InputComment">Ваш комментарий:</label></div>
            <textarea v-model="textComment" type="text" class="comment_field" cols='50' rows='10'></textarea>
          </div>

          <button @click="write_comment" type="submit" class="btn btn-primary">ОТПРАВИТЬ</button>
        </form>
    </div>
  </div>
</template>


<script>
export default{
  name: 'CommentForm',
  data(){
    return {
      textComment: ''
    }
  },

  methods: {
    write_comment(){
      let comment = this.textComment;
      this.$store.dispatch('SAVE_COMMENT', {comment: comment});
    },
  },
};
</script>

<style>

</style>
