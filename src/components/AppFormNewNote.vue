<template>
  <form @submit.prevent="submitForm" class="form-note mb-5">
    <textarea
      class="form-control"
      v-model.trim="input"
      placeholder="Текст вашей заметки"
      rows="3"
    ></textarea>
    <!-- Textarea -->
    <div class="tags my-3">
      <span
        v-for="tag in getTagList"
        @click="handleTagActive(tag)"
        :key="tag.title"
        :class="{ active: tag.isActive }"
        >{{ tag.title }}</span
      >
    </div>
    <button type="submit" :disabled="!inputValid" class="btn btn-primary">
      Сохранить
    </button>
    <!-- Tags -->
    <!-- Buttons -->
  </form>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      activeTags: [],
    };
  },

  computed: {
    getTagList() {
      return this.$store.getters.getTagList;
    },
    getActiveTag() {
      const currentActiveTags = this.getTagList.filter(
        (t) => t.isActive == true
      );
      const result = currentActiveTags.map((el) => el.title);
      return (this.activeTags = [...result]);
    },
    // Валидация формы
    inputValid() {
      return this.input.length > 3 ? true : false;
    },
  },

  methods: {
    handleTagActive(tag) {
      return this.$store.dispatch("setActiveStateOnTag", tag);
    },
    submitForm() {
      const data = this.$store.dispatch("setNewNote", {
        id: Date.now(), // Таймштамп
        title: this.input,
        tags: this.getActiveTag,
        editing: false
      });
      this.input = "";
      return data;
    },
  },
};
</script>
