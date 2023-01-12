<script lang="ts">
import Header from "../components/Header.vue"
import TaskList from "../components/TaskList.vue"
import AddTaskForm from "../components/AddTaskForm.vue"

import tasks from "../data/tasks"

import type { Task } from "../types"

export default {
  name: "Home",
  components: { Header, TaskList, AddTaskForm },
  data: () => ({
    tasks: tasks,
    showAddForm: false
  }),
  methods: {
    handleDelete(taskId: string) {
      if (confirm("Are you sure?")) {
        this.tasks = this.tasks.filter((task) => task.id !== taskId)
      }
    },
    handleToggleReminder(taskId: string) {
      this.tasks = this.tasks.map((task) =>
        // TypeScript uses extra Object.assign if you use spread operator
        task.id !== taskId ? task : Object.assign(task, { reminder: !task.reminder })
      )
    },
    handleAddTask(newTask: Task) {
      this.tasks = this.tasks.concat(newTask)
    },
    handleToggleAddForm() {
      this.showAddForm = !this.showAddForm
    }
  }
}
</script>

<template>
  <div class="container">
    <Header title="Task Tracker" :showAddForm="showAddForm" @toggleAddForm="handleToggleAddForm" />
    <AddTaskForm v-if="showAddForm" @toggleAddForm="handleToggleAddForm" @addTask="handleAddTask" />
    <TaskList
      v-if="!showAddForm && tasks.length > 0"
      @deleteTask="handleDelete"
      @toggleReminder="handleToggleReminder"
      :tasks="tasks"
    />
  </div>
</template>
