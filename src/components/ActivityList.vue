<template>
  <div class="container">
    <div class="switch-container">
      <label class="switch">
        <input 
          class="showUnfinishedOnly" 
          type="checkbox" 
          v-model="showUnfinishedOnly" 
        />
        <span class="slider"></span>
      </label>
      <label for="showUnfinishedOnly">Only show unfinished tasks</label>
      <div class="activity-counts">
        <span>Remaining: {{ remainingActivities }}</span>
        <span>Total: {{ totalActivities }}</span>
        <span>Completed: {{ completedActivities }}</span>
      </div>
    </div>

    <ul class="activity-list">
      <li v-for="activity in displayedActivities" :key="activity.id">
        <div class="activity-item">
          <input 
            type="checkbox" 
            :value="activity.id" 
            :checked="activity.completed" 
            :disabled="activity.completed" 
            @change="toggleComplete(activity.id)"
          />
          <span :class="{ 'completed': activity.completed }">{{ activity.name }}</span>
          <div class="action-buttons">
            <button 
              v-if="!activity.completed" 
              class="edit" 
              @click="openEditModal(activity.id)"
            >
              <i class="fas fa-edit"></i>
            </button>
            <button class="delete" @click="cancelActivity(activity.id)">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </li>
    </ul>

    <div v-if="showEditModal" class="edit-modal">
      <div class="modal-content">
        <h2>Edit Activity</h2>
        <input v-model="editActivityName" placeholder="Edit activity name" />
        <button @click="saveEditedActivity">Save</button>
        <button @click="closeEditModal">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['activities'],
  data() {
    return {
      showUnfinishedOnly: false,
      showEditModal: false,
      editActivityId: null,
      editActivityName: ''
    };
  },
  computed: {
    displayedActivities() {
      if (this.showUnfinishedOnly) {
        return this.activities.filter(activity => !activity.completed);
      }
      return this.activities;
    },
    totalActivities() {
      return this.activities.length;
    },
    completedActivities() {
      return this.activities.filter(activity => activity.completed).length;
    },
    remainingActivities() {
      return this.totalActivities - this.completedActivities;
    }
  },
  methods: {
    cancelActivity(id) {
      const index = this.activities.findIndex(activity => activity.id === id);
      if (index !== -1) {
        this.activities.splice(index, 1);
        this.saveActivities();
      }
    },
    toggleComplete(id) {
      const index = this.activities.findIndex(activity => activity.id === id);
      if (index !== -1) {
        this.activities[index].completed = !this.activities[index].completed;
        this.saveActivities();
      }
    },
    openEditModal(id) {
      const activity = this.activities.find(a => a.id === id);
      if (activity) {
        this.editActivityId = id;
        this.editActivityName = activity.name;
        this.showEditModal = true;
      }
    },
    saveEditedActivity() {
      const index = this.activities.findIndex(a => a.id === this.editActivityId);
      if (index > -1) {
        this.activities[index].name = this.editActivityName;
        this.showEditModal = false;
        this.saveActivities();
      }
    },
    closeEditModal() {
      this.showEditModal = false;
    },
    saveActivities() {
      localStorage.setItem('activities', JSON.stringify(this.activities));
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 1400px;
}

.switch-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.activity-list {
  width: 100%;
  max-width: 1200px;
  margin-top: 20px;
  padding: 0;
}

ul {
  list-style-type: none;
}

.activity-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
}

.activity-item input[type="checkbox"] {
  margin-right: 15px;
}

.activity-item span {
  margin-right: auto;
  white-space: nowrap;
}

.completed {
  text-decoration: line-through;
  color: gray;
}

.action-buttons {
  display: flex;
  align-items: center;
}

button.edit, button.delete {
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-left: 15px;
}

button.edit i, button.delete i {
  font-size: 20px;
}

button.delete {
  margin-left: 0;
}

.switch-container label {
  margin-bottom: 0;
}

.switch-container label[for="showUnfinishedOnly"] {
  margin-bottom: 2px;
}

.switch-container label.switch {
  position: relative;
  display: inline-block;
  width: 46px;
  height: 20px;
  margin-right: 10px;
}

.switch-container label.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 20px;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 2px;
  bottom: 1px;
  background-color: white;
  border-radius: 50%;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.activity-counts {
  margin-left: auto;
  display: flex;
  align-items: center;
}

.activity-counts span {
  margin-left: 15px;
  font-size: 14px;
  color: #666;
}

.edit-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: gray;
  padding: 25px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
}

.modal-content input {
  width: 80%;
  padding: 12px;
  margin-bottom: 15px;
 
}

.modal-content button {
  padding: 12px;
  margin-right: 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal-content button:last-child {
  margin-right: 0;
  background-color: #DC3545;
  color: white;
}

.modal-content button:last-child:hover {
  background-color: #C82333;
}

.edit-active {
  background-color: #f4f4f4; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.edit-active h2 {
  margin-bottom: 20px;
  color: black;
}

.edit-active input,
.edit-active button {
  margin-bottom: 15px;
}
</style>
