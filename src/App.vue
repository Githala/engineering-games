<script setup>
import Display from '@/components/Display.vue';
import {ref} from 'vue';
import RotaryEncoder from '@/components/RotaryEncoder.vue';

const steps = ref(10);

const waveFunc = ref([
  { a: 1, b: 1, c: 2 },
  { a: 2, b: 3, c: 4 },
  { a: 1, b: 10, c: 3 }
])

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
    <Display :wave-func="waveFunc" />
    <div style="display: flex; gap: 30px">
      <div>
        <RotaryEncoder :max-steps="10" v-model:step="waveFunc[0].a" v-model:max-steps="steps"></RotaryEncoder>
        <div>
          <button @click="addA(0,1)">A++</button>
          <button @click="addA(0,-1)">A--</button>
        </div>
        <RotaryEncoder :max-steps="10" v-model:step="waveFunc[0].b" v-model:max-steps="steps"></RotaryEncoder>
        <div>
          <button @click="addB(0,1)">B++</button>
          <button @click="addB(0,-1)">B--</button>
        </div>
        <RotaryEncoder :max-steps="10" v-model:step="waveFunc[0].c" v-model:max-steps="steps"></RotaryEncoder>
        <div>
          <button @click="addC(0,1)">C++</button>
          <button @click="addC(0,-1)">C--</button>
        </div>
      </div>
      <div>
        <RotaryEncoder :max-steps="10" v-model:step="waveFunc[1].a" v-model:max-steps="steps"></RotaryEncoder>
        <div>
          <button @click="addA(1,1)">A++</button>
          <button @click="addA(1,-1)">A--</button>
        </div>
        <RotaryEncoder :max-steps="10" v-model:step="waveFunc[1].b" v-model:max-steps="steps"></RotaryEncoder>
        <div>
          <button @click="addB(1,1)">B++</button>
          <button @click="addB(1,-1)">B--</button>
        </div>
        <RotaryEncoder :max-steps="10" v-model:step="waveFunc[1].c" v-model:max-steps="steps"></RotaryEncoder>
        <div>
          <button @click="addC(1,1)">C++</button>
          <button @click="addC(1,-1)">C--</button>
        </div>
      </div>
      <div>
        <RotaryEncoder :max-steps="10" v-model:step="waveFunc[2].a" v-model:max-steps="steps"></RotaryEncoder>
        <div>
          <button @click="addA(2,1)">A++</button>
          <button @click="addA(2,-1)">A--</button>
        </div>
        <RotaryEncoder :max-steps="10" v-model:step="waveFunc[2].b" v-model:max-steps="steps"></RotaryEncoder>
        <div>
          <button @click="addB(2,1)">B++</button>
          <button @click="addB(2,-1)">B--</button>
        </div>
        <RotaryEncoder :max-steps="10" v-model:step="waveFunc[2].c" v-model:max-steps="steps"></RotaryEncoder>
        <div>
          <button @click="addC(2,1)">C++</button>
          <button @click="addC(2,-1)">C--</button>
        </div>
      </div>
    </div>
  </main>


</template>

<style scoped>
</style>
