<script setup>
import Navbar from '../components/Navbar.vue'
import ComparisonTray from '../components/ComparisonTray.vue'
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-obsidian-950 transition-colors duration-300">
    <Navbar />
    <slot />
    <ComparisonTray />
  </div>
</template>
