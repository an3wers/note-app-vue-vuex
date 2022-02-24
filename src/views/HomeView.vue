<template>
  <div>
    <h1 class="my-5">Add new note</h1>
    <div class="row justify-content-center">
      <div class="col-8">
        <form class="form-note mb-5">
          <textarea
            class="form-control"
            v-model="input"
            placeholder="Текст вашей заметки"
            rows="3"
          ></textarea>
          <!-- Textarea -->
          <div class="tags my-3">
            <span v-for="tag in tagList" @click="handleTagActive(tag)" :key="tag.title" :class="{active: tag.isActive}">{{tag.title}}</span>
          </div>
          <button type="submit" class="btn btn-primary">Сохранить</button>
          <!-- Tags -->
          <!-- Buttons -->
        </form>
        <!-- List note -->
        <h3 class="mb-3">Note list</h3>
        <div v-if="noteList.length > 0" class="note-list">
          <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <div class="note-tags mb-1">
                <span>#home</span>
                <span>#idea</span>
              </div>
              <a href="#" class="card-link">Удалить</a>
              <!-- <a href="#" class="card-link">Завершить</a> -->
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
      input: '',
      noteList: [],
      tagList: [
        {title: 'Home', isActive: false},
        {title: 'Work', isActive: false},
        {title: 'Idea', isActive: false}
      ],
      activeTags: [],
    }
  },
  methods: {
    handleTagActive(tag) {
      tag.isActive = !tag.isActive
      const currentTag = tag.title
      
      const result = this.activeTags.find(tag => tag === currentTag)

      if(result) {
       this.activeTags = this.activeTags.filter(tag => tag != currentTag)
      }
      else {
        this.activeTags.push(currentTag)
      }

    }
  },
  computed: {

  },
  watch: {
    activeTags: {
      handler(body) {
        console.log(body)
      },
      deep:true
    }
  }
}

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
