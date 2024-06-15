<template>
  <div id="home">
    <h1>Activity Tracker</h1>
    <AddActivity @add="addActivity" />
    <ActivityList 
      :activities="activities" 
      @cancel="cancelActivity" 
      @complete="completeActivity" 
    />
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useActivityStore } from '../stores/store.js';
import ActivityList from '../components/ActivityList.vue';
import AddActivity from '../components/AddActivity.vue';

const store = useActivityStore();

onMounted(() => {
  store.loadActivities();
});

const addActivity = (name) => {
  store.addActivity(name);
};

const cancelActivity = (id) => {
  store.cancelActivity(id);
};

const completeActivity = (id) => {
  store.completeActivity(id);
};

const activities = computed(() => store.activities);
</script>

<style scoped>
#home {
  width: 1700px;
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
}
</style>
