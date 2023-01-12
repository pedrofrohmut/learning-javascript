<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "Links"
})
</script>

<template>
  <div class="links">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
  </div>
</template>

<style scoped>
.links {
  margin-bottom: 30px;
}
.links a {
  margin-right: 10px;
  color: #aaa;
  text-decoration: none;
  position: relative;
}

.links a::after {
  content: "";
  position: absolute;
  background-color: #aaa;
  height: 2px;
  width: 95%;
  top: 100%;
  left: 0;
}
</style>
