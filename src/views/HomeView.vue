<template>
  <div>
    <h1 class="my-5">Add new note</h1>
    <div class="row justify-content-center">
      <div class="col-8">
        
        <!-- Форма добавления заметки -->
        <app-form-new-note />
        
        <!-- Список заметок -->
        <app-note-list />

      </div>
    </div>
  </div>
</template>

<script>
import AppNoteList from '@/components/AppNoteList.vue'
import AppFormNewNote from '@/components/AppFormNewNote.vue'

export default {

  components: {
    AppNoteList,
    AppFormNewNote
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

.app-modal-backdrop {
  position: fixed;
  display: none;
  z-index: 1020;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: black;
  opacity: 0.3;
}

.app-modal-backdrop.show {
  display: block;
}

.app-modal {
  z-index: 1030;
  width: 600px;
  height: auto;
  /* margin: 2rem auto; */
  padding: 1.5rem;
  position: fixed;
  top: 20%;
  left: 50%;
  margin-left: -300px;
  display: none;
  background-color: white;
}

.app-modal__footer {
  display: flex;
 justify-content: flex-end;
}

.app-modal.show {
  display: block;
}

</style>
