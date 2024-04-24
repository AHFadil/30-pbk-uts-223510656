<template>
  <div id="app">
    <h1>Activity Tracker</h1>
    
    <AddActivity @add="addActivity" />
    
    <ActivityList :activities="activities" @cancel="cancelActivity" @complete="completeActivity" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import ActivityList from './components/ActivityList.vue';
import AddActivity from './components/AddActivity.vue';

export default {
  components: {
    ActivityList,
    AddActivity
  },
  setup() {
    const activities = ref([]);

    onMounted(() => {
      if (localStorage.getItem('activities')) {
        activities.value = JSON.parse(localStorage.getItem('activities'));
      }
    });

    const addActivity = (name) => {
      const newActivity = { id: Date.now(), name, completed: false };
      activities.value.unshift(newActivity);
      console.log(`Added activity: ${name}`);
      saveActivities();
    };

    const cancelActivity = (id) => {
      const index = activities.value.findIndex(activity => activity.id === id);
      if (index > -1) {
        activities.value.splice(index, 1);
        saveActivities();
      }
    };

    const completeActivity = (id) => {
      const index = activities.value.findIndex(activity => activity.id === id);
      if (index > -1) {
        activities.value[index].completed = !activities.value[index].completed;
        saveActivities();
      }
    };

    const saveActivities = () => {
      localStorage.setItem('activities', JSON.stringify(activities.value));
    };

    return {
      activities,
      addActivity,
      cancelActivity,
      completeActivity
    };
  }
}
</script>

<style scoped>
#app {
  width: 1700px;
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
}

</style>
