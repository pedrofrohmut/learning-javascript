<script lang="ts">
import Links from "./components/Links.vue"

export default {
  name: "App",
  components: { Links }
}
</script>

<template>
  <Links />
  <router-view></router-view>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  color: #fffc;
  background-color: #2b2a2d;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  overflow-x: hidden;
}

body {
  font-family: "Poppins", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
}

#app {
  max-width: 850px;
  width: 550px;
  min-width: 320px;
}

.container {
  max-width: 850px;
  margin: 30px auto;
  overflow: auto;
  border: 1px solid #444;
  padding: 30px;
  border-radius: 5px;
  background-color: #242424;
}

.btn {
  display: inline-block;
  background: #888;
  color: #333;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
  font-weight: 600;
}

.btn:focus {
  outline: none;
}

.btn:active {
  transform: scale(0.98);
}

.btn-block {
  display: block;
  width: 100%;
}
</style>
