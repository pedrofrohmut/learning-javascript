<script lang="ts">
import { v4 as uuid } from "uuid"

export default {
  name: "AddTaskForm",
  data: () => ({
    text: "",
    day: "",
    reminder: false
  }),
  methods: {
    handleAddTask(e: any) {
      e.preventDefault()
      const newId = uuid()
      this.$emit("addTask", { id: newId, text: this.text, day: this.day, reminder: this.reminder })
      this.text = ""
      this.day = ""
      this.reminder = false
      this.$emit("toggleAddForm")
    }
  },
  emits: ["addTask", "toggleAddForm"]
}
</script>

<template>
  <form class="add-form" @submit="handleAddTask">
    <div class="form-control">
      <label>Task</label>
      <input type="text" name="text" v-model="text" placeholder="Add Task" required />
    </div>
    <div class="form-control">
      <label>Day & Time</label>
      <input type="text" name="day" v-model="day" placeholder="Add Day & Time" required />
    </div>
    <div class="form-control">
      <label>Set Reminder <input type="checkbox" v-model="reminder" name="reminder" /></label>
    </div>
    <div class="form-control">
      <button type="submit" class="btn">Save Task</button>
    </div>
  </form>
</template>

<style scoped>
.add-form {
  margin-bottom: 40px;
}

.form-control {
  margin: 20px 0;
}

.form-control label {
  display: block;
  margin-bottom: 5px;
}

.form-control input[type="text"] {
  width: 100%;
  height: 40px;
  padding: 3px 7px;
  font-size: 17px;
  margin-bottom: 10px;
}

.form-control input[type="checkbox"] {
  width: 23px;
  height: 23px;
  position: relative;
  top: 6px;
  margin-left: 7px;
}

.form-control button[type="submit"] {
  background-color: #c3c3c3;
  color: #333;
  border: 1px solid #c3c3c3;
}

.form-control button[type="submit"]:focus,
.form-control button[type="submit"]:hover {
  background-color: #333;
  color: #c3c3c3;
  border: 1px solid #c3c3c3;
}
</style>
