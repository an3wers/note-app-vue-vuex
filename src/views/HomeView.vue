<template>
  <div>
    <h1 class="my-5">Add new note</h1>
    <div class="row justify-content-center">
      <div class="col-8">
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
        <!-- List note -->
        <h3 class="mb-3">Note list</h3>
        
        <div v-if="getNoteList.length > 0" class="note-list">
          <div v-for="(note, index) in getNoteList" :key="index" class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">{{ note.title }}</h5>
              <div class="note-tags mb-1">
                <span v-for="tag in note.tags" :key="tag">#{{ tag }}</span>
              </div>
              <a href="#" @click.prevent="removeNote(note)" class="card-link"
                >Удалить</a
              >
              
            </div>
          </div>
        </div>

        <div v-else class="note-list_empty">
          <div class="card">
            <div class="card-body">У вас пока нет ни одной заметки.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      activeTags: [],
    };
  },
  methods: {
    handleTagActive(tag) {
      return this.$store.dispatch('setActiveStateOnTag', tag)
    },

    submitForm() {
       const data = this.$store.dispatch('setNewNote', {title: this.input, tags:this.getActiveTag})
      this.input = ''
      return data
    },

    removeNote(note) {
      return this.$store.dispatch('removeNote', note)
    }

  },
  computed: {

    // Получаем данные с стора vuex
    
    getNoteList() {
      return this.$store.getters.getNoteList
    },

    getTagList() {
       return this.$store.getters.getTagList
    },

    // возвразаю список активных тэгов, массив объектов
    getActiveTag() {
      const currentActiveTags = this.getTagList.filter(t => t.isActive == true)
      const result = currentActiveTags.map(el => el.title)
      return this.activeTags = [...result]

    },

    // Валидация формы
    inputValid() {
      return this.input.length > 3 ? true : false;
    },
  },
 
  mounted() {
    
    return this.$store.dispatch('updateNoteList')
 
  },
};
</script>

<style>
.form-note {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.tags {
  display: flex;
  justify-content: center;
}

.tags > span {
  margin: 0 8px;
  cursor: pointer;
}

.tags > span.active {
  font-weight: 700;
}

.note-tags {
  display: flex;
  font-size: 0.875rem;
  color: gray;
}

.note-tags > span:not(:last-child) {
  margin-right: 8px;
}
</style>
