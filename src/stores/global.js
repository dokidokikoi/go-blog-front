import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useGlobalStore = defineStore("globalStore", () => {
  const loading = ref(false);

  return { loading };
});
