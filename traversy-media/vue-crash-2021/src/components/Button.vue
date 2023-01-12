<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "Button",
  props: {
    text: String,
    bgColor: String,
    textColor: String,
    type: String
  }
})
</script>

<template>
  <button
    :type="type ? type : 'button'"
    class="btn"
    :style="{ backgroundColor: bgColor, color: textColor }"
  >
    {{ text }}
  </button>
</template>
