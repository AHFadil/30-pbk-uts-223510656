<template>
  <div>
    <input v-model="newActivity" @keyup.enter="addActivity" placeholder="Add new activity" />
    <button @click="addActivity">Add</button>
  </div>
</template>

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
