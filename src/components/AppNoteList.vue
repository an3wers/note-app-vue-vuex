<template>
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
        <a href="#" @click.prevent="editNote(note)" class="card-link"
          >Изменить</a
        >
      </div>
    </div>
  </div>

  <div v-else class="note-list_empty">
    <div class="card">
      <div class="card-body">У вас пока нет ни одной заметки.</div>
    </div>
  </div>

  <!-- Модальное окно -->
  <Teleport to="body">
    <div
      v-if="getModalIsActive"
      :class="{ show: getModalIsActive }"
      class="app-modal-backdrop"
      @click="closeModal"
    ></div>

    <div
      v-if="getModalIsActive"
      :class="{ show: getModalIsActive }"
      class="app-modal"
    >
      <div class="app-modal__header">
        <h4>Изменить заметку</h4>
      </div>
      <div class="app-modal__body py-4">
        <form>
          <textarea v-model="input" class="form-control" rows="3"></textarea>
          <div class="tags my-3">
            <span>Тэги</span>
          </div>
        </form>
      </div>
      <div class="app-modal__footer">
        <button type="button" @click="closeModal" class="btn btn-secondary me-2">Отменить</button>
        <button type="button" class="btn btn-primary">Обновить</button>
      </div>
    </div>
  </Teleport>

  <!-- #Модальное окно -->
</template>

<script>
export default {
  data() {
    return {
      modalIsActive: false,
      input: ''
    };
  },

  methods: {
    removeNote(note) {
      return this.$store.dispatch("removeNote", note);
    },
    editNote(note) {
      this.modalIsActive = true;
      this.input = note.title
      this.$store.dispatch("editNote", note); // ?
    },
    closeModal(){
      this.modalIsActive = false
    }
  },

  computed: {
    getNoteList() {
      return this.$store.getters.getNoteList;
    },

    getModalIsActive() {
      return this.modalIsActive;
    },
  },

  mounted() {
    return this.$store.dispatch("updateNoteList");
  },
};
</script>
