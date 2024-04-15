<script setup>
import Display from '@/components/Display.vue';
import {ref} from 'vue';
import RotaryEncoder from '@/components/RotaryEncoder.vue';

const waveFunc = ref([
  { a: 1, b: 1, c: 2 },
  { a: 2, b: 3, c: 4 },
  { a: 1, b: 10, c: 3 }
])

function addA(a) {
  waveFunc.value.a+=a;
}
function addB(b) {
  waveFunc.value.b += b;
}
function addC(c) {
  waveFunc.value.c += c;
}


</script>

<template>
  <main>
    <Display v-model="waveFunc" />
  </main>
  <div>
    <RotaryEncoder></RotaryEncoder>
    <div>
      <button @click="addA(1)">A++</button>
      <button @click="addA(-1)">A--</button>
    </div>
    <div>
      <button @click="addB(1)">B++</button>
      <button @click="addB(-1)">B--</button>
    </div>
    <div>
      <button @click="addC(1)">C++</button>
      <button @click="addC(-1)">C--</button>
    </div>
  </div>
</template>

<style scoped>
</style>
