<script setup>
import {computed} from 'vue';

let step = defineModel('step')
const maxSteps = defineModel('maxSteps')

let rotate = computed(() => {
  return `transform: rotate(${step.value / maxSteps.value * 360}deg)`
})

function clicked(x) {
  step.value+=x;
}

</script>

<template>
  <div class="circle">
    <svg :style="rotate"  viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient gradientUnits="userSpaceOnUse" x1="189.251" y1="179.572" x2="189.251" y2="244.234" id="gradient-0">
          <stop offset="0" style="stop-color: rgb(25.882% 25.882% 25.882%)"></stop>
          <stop offset="1" style="stop-color: rgb(16.241% 16.241% 16.241%)"></stop>
        </linearGradient>
      </defs>
      <ellipse style="fill: rgb(66, 66, 66); paint-order: fill; stroke: rgb(152, 152, 152); stroke-width: 2px;" cx="50" cy="50.071" rx="46" ry="46"></ellipse>
      <rect x="48.6" width="3" height="21.417" style="stroke: rgb(255, 255, 255); fill: rgb(255, 255, 255);" y="9"></rect>
    </svg>
    <div class="buttons">
      <div class="left" @click="clicked(-1)"></div>
      <div class="right" @click="clicked(1)"></div>
    </div>

  </div>

</template>

<style scoped>
  .circle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    position: relative;
    padding: 0px;
    margin: 0px;
  }

  .buttons {
    position: relative;
    top: -85px;
    left: 0;
    width: 80px;
    height: 80px;
  }

  .left {
    width: 40px;
    height: 80px;
    position: absolute;
    left: 0;
  }
  
  .right {
    width: 40px;
    height: 80px;
    position: absolute;
    right: 0;
  }
</style>