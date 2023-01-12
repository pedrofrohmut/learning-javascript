<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "TaskListItem",
  props: {
    task: Object
  }
})
</script>

<template>
  <div
    @dblclick="$emit('toggleReminder', task.id)"
    :class="[task.reminder ? 'reminder' : '', 'task']"
  >
    <div class="content">
      <h3>{{ task.text }}</h3>
      <p>{{ task.day }}</p>
    </div>
    <button @click="$emit('deleteTask', task.id)" class="btn">
      <i class="fa fa-trash"></i>
    </button>
  </div>
</template>

<style scope>
.task {
  background-color: #67666940;
  padding: 10px 20px;
  cursor: pointer;
  margin-bottom: 20px;
  display: flex;
  border-radius: 8px;
  border-left: 5px solid #666;
  border-bottom: 5px solid #666;
}

.content {
  flex: 1;
}

.task.reminder {
  border-left: 5px solid green;
  border-bottom: 5px solid green;
}

button.btn {
  color: #888;
  font-size: 0.9rem;
  background-color: #0003;
  outline: none;
  border: 1px solid #0003;
}

button.btn:focus,
button.btn:hover {
  background-color: #000a;
  border: 1px solid #fff6;
}
</style>
