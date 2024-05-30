<script setup>
import Display from '@/components/GraphDisplay.vue';
import {ref} from 'vue';

const waveFunc = ref([])

const targetWave = ref([]);

const currentSineWaveIndex = ref(0);

const solved = ref(false);

function getState() {
  fetch("http://localhost:3000/state")
    .then(resp => resp.json())
    .then(data => {
      targetWave.value = data.targetWave.sineWaves
      waveFunc.value = data.currentWave.sineWaves
      currentSineWaveIndex.value = data.currentSineWaveIndex;
      solved.value = data.solved;
    })
}

getState();


const socket = new WebSocket("ws://localhost:3001");
socket.addEventListener("message", msg => {
  const data = JSON.parse(msg.data);
  waveFunc.value = data.currentWave.sineWaves;
  targetWave.value = data.targetWave.sineWaves;
  currentSineWaveIndex.value = data.currentSineWaveIndex;
  solved.value = data.solved;
});

function next() {
  socket.send("action:next");
  getState()
}
function prev() {
  socket.send("action:prev");
  getState();
}
function newTarget() {
  socket.send("action:newTarget");
  getState();
}

</script>

<template>
  <main>
    <div style="position: relative;">
      <Display :wave-func="waveFunc" :target-wave-func="targetWave"/>
      <div class="solvedMessage" v-if="solved">FREQUENCIES IN SYNC!</div>
    </div>
    <div class="info">
      <div v-for="wave,index in waveFunc" :class="{selected: index===currentSineWaveIndex}">
        Wave{{index}} 
      { 
        ampl: {{ wave.amplitude }},
        freq: {{ wave.frequency }},
        shft: {{ wave.phaseShift }}
      }
    </div>
    </div>
    <button :onclick="newTarget">New</button>
    <button :onclick="next">Next</button>
    <button :onclick="prev">Prev</button>
  </main>
</template>

<style scoped>
main {
  width: 1024;
  height: 600;
  
}

.info {
  margin: 10px 0px;
  padding: 5px 10px;
  border: 2px solid grey;
}

.selected {
  font-weight: bold;
}

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

.solvedMessage {
  position: absolute;
  top: 0px; 
  left: 0px;
  height: 500px;
  width: 1000px;
  font-size: 72px;
  text-align: center;
  line-height: 500px;
  color: #aaeeaa;
  text-shadow: 0 0 25px green,
               0 0 25px green,
               0 0 25px green,
               0 0 25px green;
}
</style>
