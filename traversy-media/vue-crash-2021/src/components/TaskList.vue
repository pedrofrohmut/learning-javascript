<script lang="ts">
import { defineComponent } from "vue"

import TaskListItem from "./TaskListItem.vue"

export default defineComponent({
  name: "TaskList",
  props: {
    tasks: Array
  },
  components: {
    TaskListItem
  },
  emits: ["deleteTask", "toggleReminder"]
})
</script>

<template>
  <div class="title">Tasks:</div>
  <div :key="task.id" v-for="task in tasks" class="tasks">
    <TaskListItem
      @toggleReminder="$emit('toggleReminder', task.id)"
      @deleteTask="$emit('deleteTask', task.id)"
      :task="task"
    />
  </div>
</template>

<style scoped>
.title {
  margin-bottom: 10px;
  font-size: 1.2rem;
}
</style>
