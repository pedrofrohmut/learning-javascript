<script setup lang="ts">
import { ref } from "vue"

const products = ref([])

const fetchProducts = async () => {
    const response = await fetch("http://localhost:5000/products")
    const output = await response.json()
    products.value.push(...output)
}

fetchProducts()
</script>

<template>
    <div v-for="product in products">
        <div class="product-description">{{ product.description }}</div>
        <div class="product-price">{{ product.price }}</div>
    </div>
</template>

<style scoped></style>
