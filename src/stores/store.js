// src/store.js
import { defineStore } from 'pinia';

export const useActivityStore = defineStore('activity', {
  state: () => ({
    activities: []
  }),
  actions: {
    addActivity(name) {
      const newActivity = { id: Date.now(), name, completed: false };
      this.activities.unshift(newActivity);
      this.saveActivities();
    },
    cancelActivity(id) {
      const index = this.activities.findIndex(activity => activity.id === id);
      if (index > -1) {
        this.activities.splice(index, 1);
        this.saveActivities();
      }
    },
    completeActivity(id) {
      const index = this.activities.findIndex(activity => activity.id === id);
      if (index > -1) {
        this.activities[index].completed = !this.activities[index].completed;
        this.saveActivities();
      }
    },
    saveActivities() {
      localStorage.setItem('activities', JSON.stringify(this.activities));
    },
    loadActivities() {
      if (localStorage.getItem('activities')) {
        this.activities = JSON.parse(localStorage.getItem('activities'));
      }
    }
  }
});
