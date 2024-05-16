<script setup>
import Display from '@/components/GraphDisplay.vue';
import {ref} from 'vue';

const waveFunc = ref([])

const targetWave = ref([]);

fetch("http://localhost:3000")
  .then(resp => resp.json())
  .then(data => {
    targetWave.value = data.targetWave.sineWaves
    waveFunc.value = data.currentWave.sineWaves
  })

const socket = new WebSocket("ws://localhost:3001");
socket.addEventListener("message", msg => {
  waveFunc.value = JSON.parse(msg.data).sineWaves;
});

</script>

<template>
  <main>
    <Display :wave-func="waveFunc" :target-wave-func="targetWave"/>
  </main>
</template>

<style scoped>
input[type=checkbox] {
  margin-right: 10px;
}

h2 {
  margin-right: 10px;
  font-weight: bold;
}

.rotary-input {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wave-functions {
  display: flex;
  flex-direction: row;
  gap: 30px;
  align-items: center;
  border-bottom: 1px solid grey;
  padding-bottom: 20px;
  margin-bottom: 10px;
}
</style>
