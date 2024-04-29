<script setup>
import Display from '@/components/GraphDisplay.vue';
import {ref} from 'vue';
import RotaryEncoder from '@/components/RotaryEncoder.vue';
import StringDisplay from '@/components/StringDisplay.vue';
import SineWave from '@/models/SineWave.js';
import WaveGenerator from '@/service/WaveGenerator.js';

const steps = ref(10);

const waveFunc = ref([
    new SineWave(1,1, 2),
    new SineWave(2,3, 4),
    new SineWave(1,10, 3)
])

const targetWave = ref(new WaveGenerator().randomWave());


function addA(a,b) {
  waveFunc.value[a].a+=b;
}
function addB(a,b) {
  waveFunc.value[a].b += b;
}
function addC(a,b) {
  waveFunc.value[a].c += b;
}


</script>

<template>
  <main>
    <Display :wave-func="waveFunc" :target-wave-func="targetWave"/>
    <div>
      <div v-for="(f,index) in waveFunc" class="wave-functions">
        <h2>
<!--          <input type="checkbox">-->
          Sine {{index}}</h2>
        <div class="rotary-input">
          <StringDisplay>{{f.a}}</StringDisplay>
          <RotaryEncoder :max-steps="5" v-model:step="f.a" v-model:max-steps="steps"></RotaryEncoder>
        </div>
        <div class="rotary-input">
          <StringDisplay>{{f.b}}</StringDisplay>
          <RotaryEncoder :max-steps="10" v-model:step="f.b" v-model:max-steps="steps"></RotaryEncoder>
        </div>
        <div class="rotary-input">
          <StringDisplay>{{f.c}}</StringDisplay>
          <RotaryEncoder :max-steps="4" v-model:step="f.c" v-model:max-steps="steps"></RotaryEncoder>
        </div>
      </div>
    </div>
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
