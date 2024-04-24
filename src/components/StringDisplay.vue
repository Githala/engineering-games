<script setup>

</script>

<template>
  <div class="display-container">
    <slot></slot>
  </div>
</template>

<style scoped>
  .display-container {
    width: 60px;
    background-color: #000;
    border: 1px solid green;
    border-radius: 10px;
    margin: 10px;
    font-size: 25px;
    text-align: center;
    color: #0f0;
  }
</style>