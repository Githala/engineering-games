<script setup>
import {computed} from 'vue';

let step = defineModel('step')
const maxSteps = defineModel('maxSteps')

// const model = defineModel()
    // defineProps(['step', 'maxSteps'])
// const emit = defineEmits(['update:step'])

let rotate = computed(() => {
  console.log(step.value, maxSteps.value);
  return `transform: rotate(${step.value / maxSteps.value * 360}deg)`
})

function clicked() {
  step.value++
}

</script>

<template>
  <div class="circle" :style="rotate" @click="clicked">
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient gradientUnits="userSpaceOnUse" x1="189.251" y1="179.572" x2="189.251" y2="244.234" id="gradient-0">
        <stop offset="0" style="stop-color: rgb(25.882% 25.882% 25.882%)"></stop>
        <stop offset="1" style="stop-color: rgb(16.241% 16.241% 16.241%)"></stop>
      </linearGradient>
    </defs>
    <ellipse style="fill: rgb(66, 66, 66); paint-order: fill; stroke: rgb(152, 152, 152); stroke-width: 2px;" cx="50" cy="50.071" rx="46" ry="46"></ellipse>
    <rect x="48.6" width="3" height="21.417" style="stroke: rgb(255, 255, 255); fill: rgb(255, 255, 255);" y="9"></rect>
  </svg>
  </div>
</template>

<style scoped>
  .circle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
</style>