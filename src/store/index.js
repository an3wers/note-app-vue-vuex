import { createStore } from "vuex";
import { setItemToLs } from '@/api.js';

export default createStore({
  state: {
    noteList: [],
    tagList: [
      { title: "Home", isActive: false },
      { title: "Work", isActive: false },
      { title: "Idea", isActive: false },
    ],
  },
  getters: {
    getNoteList(state) {
      return state.noteList
    },
    getTagList(state){
      return state.tagList
    }
  },
  mutations: {
    setActiveStateOnTag(state, tag) {
      const findTag = state.tagList.find(t => t.title === tag.title)
      findTag.isActive = !findTag.isActive
    },
    setNewNote(state, note) {
      state.noteList.push(note)
      state.tagList.forEach(el => el.isActive = false)
      const data = JSON.stringify(state.noteList)
      setItemToLs('notes', data)
      // localStorage.setItem('notes', JSON.stringify(state.noteList))
    },
    removeNote(state, note) {
      state.noteList = state.noteList.filter(n => n.title != note.title)
      const data = JSON.stringify(state.noteList)
      setItemToLs('notes', data)
      // localStorage.setItem('notes', JSON.stringify(state.noteList))
    },

    updateNoteList(state) {
      const data = localStorage.getItem('notes')
      if(data) {
        state.noteList = JSON.parse(data)
      }
    }

  },
  actions: {
    setActiveStateOnTag({commit}, tag){
      commit('setActiveStateOnTag', tag)
    },

    setNewNote({commit}, note) {
      commit('setNewNote', note)
    },
    removeNote({commit}, note) {
      commit('removeNote', note)
    },
    updateNoteList({commit}) {
      commit('updateNoteList')
    }
  },
  // modules: {},
});
