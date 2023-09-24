import { setItem } from '../utlis/localStorage'
import { defineStore } from "pinia";

export const useUserStore = defineStore('userStore', {
    state: () => {
      return {
        user: {}
      }
    },
    actions: {
      setUser(u) {
        this.user = u
      },
    },
  })