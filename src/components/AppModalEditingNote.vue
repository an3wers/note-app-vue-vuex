<template>
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
            <span
              v-for="(tag, i) in currentTagList"
              :key="i"
            >
              {{ tag }}
            </span>
          </div>
        </form>
      </div>
      <div class="app-modal__footer">
        <button type="button" @click="close" class="btn btn-secondary me-2">
          Отменить
        </button>
        <button type="button" @click="update(input)" class="btn btn-primary">
          Обновить
        </button>
      </div>
    </div>
  </Teleport>

  <!-- #Модальное окно -->
</template>

<script>
export default {
  props: {
    modalIsActive: {
      type: Boolean,
      required: true,
      default: false,
    },

    editingNote: {
      type: Object,
      required: false,
    },
  },

  data() {
    return {
      input: this.editingNote.title,
      currentTagList: this.editingNote.tags,
    };
  },

  emits: ["closeModal", "updateNote"],

  methods: {
    close() {
      this.$emit("closeModal");
    },

    update(input) {

      this.$emit("updateNote", input);
    },


  },
  computed: {
    getModalIsActive() {
      return this.modalIsActive;
    },

   
  },
};
</script>
