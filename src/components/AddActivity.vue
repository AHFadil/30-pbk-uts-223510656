<template>
  <div>
    <input v-model="newActivity" @keyup.enter="addActivity" placeholder="Add new activity" />
    <button @click="addActivity">Add</button>
  </div>
</template>

<<<<<<< HEAD
<script>
export default {
  data() {
    return {
      newActivity: ''
    };
  },
  methods: {
    addActivity() {
      if (this.newActivity.trim() !== '') {
        this.$emit('add', this.newActivity);
        console.log(`Adding activity: ${this.newActivity}`);
        this.newActivity = '';
      }
    }
  }
}
</script>

=======
<script setup>
import { ref } from 'vue';
import { useActivityStore } from '../stores/store.js';

const newActivity = ref('');
const store = useActivityStore();

const addActivity = () => {
  if (newActivity.value.trim() !== '') {
    store.addActivity(newActivity.value);
    console.log(`Adding activity: ${newActivity.value}`);
    newActivity.value = '';
  }
};
</script>



>>>>>>> 61a8c7e (Perubahan Untuk UAS)
<style scoped>
input, button {
  padding: 10px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
}

button {
  background-color: #007BFF;
  color: white;
  cursor: pointer;
  padding-top: 6px;
}

button:hover {
  background-color: #0056b3;
}
</style>
