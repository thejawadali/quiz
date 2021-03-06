import { uniq } from "lodash-es"
import { defineStore } from 'pinia'


const dbPath = "/quiz/db.json"

export const questionStore = defineStore({
  id: 'Questions',
  state: () => ({
    categories: [],
  }),
  getters: {

  },
  actions: {
    fetchCategories() {
      fetch(dbPath)
        .then((response) => response.json())
        .then(
          (data) =>
            this.categories = uniq(data.questions.map((c: any) => c.category))
        )
    },
    fetchQuestions(cb: (obj: any) => any) {
      const category = localStorage.getItem("selected-category") || ''
      fetch(dbPath)
        .then((response) => response.json())
        .then(
          (data) => cb(category ? data.questions.filter((ques: any) => ques.category == category) : data.questions)
        )
    }
  }
})