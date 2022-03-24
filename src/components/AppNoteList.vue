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

  <app-modal-editing-note v-if="modalIsActive" @updateNote="handleUpdateNote" @closeModal="handleCloseModal" :editingNote="editingNote" :modalIsActive="modalIsActive" />

 
</template>

<script>
import AppModalEditingNote from '@/components/AppModalEditingNote.vue'

export default {
  data() {
    return {
      modalIsActive: false,
      editingNote: null
    };
  },
  components: {
      AppModalEditingNote
  },
  methods: {
    removeNote(note) {
      return this.$store.dispatch("removeNote", note);
    },

    editNote(note) {
      this.editingNote = note
      this.modalIsActive = true;
      this.$store.dispatch("editNote", note); // ?
    },

    handleCloseModal() {
      this.modalIsActive = false
      this.$store.dispatch("editNote", this.editingNote);
      this.editingNote = null;
    },

    handleUpdateNote(body) {
      console.log(body)
      this.$store.dispatch("updateNote", { title: body });
      this.modalIsActive = false;
      this.editingNote = null;
    }

  },

  computed: {
    getNoteList() {
      return this.$store.getters.getNoteList;
    },
  },

  mounted() {
    return this.$store.dispatch("updateNoteList");
  },
};
</script>
