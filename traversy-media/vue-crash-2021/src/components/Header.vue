<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "Header",
  props: {
    title: String,
    showAddForm: Boolean
  }
})
</script>

<template>
  <header>
    <h1>{{ showAddForm ? "Add Task" : title }}</h1>
    <button
      v-if="showAddForm === false"
      @click="$emit('toggleAddForm')"
      type="button"
      class="add btn"
    >
      Add Form
    </button>
    <button
      v-if="showAddForm === true"
      @click="$emit('toggleAddForm')"
      type="button"
      class="close btn"
    >
      Close
    </button>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

button[type="button"].add {
  background-color: #333;
  color: #666;
  border: 0;
}

button[type="button"].add:focus,
button[type="button"].add:hover {
  background-color: #333;
  color: #666;
  border: 0;
}

button[type="button"].close {
  background-color: #333;
  color: #666;
  border: 0;
}

button[type="button"].close:hover button[type="button"].close:focus {
  background-color: #333;
  color: #333;
  border: 0;
}
</style>
