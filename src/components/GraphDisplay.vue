<script setup>
import {onMounted, watch} from 'vue';

// const waveFunc = defineModel();

const props = defineProps(['waveFunc'])

watch(() => props.waveFunc, (value) => {
  console.log(value);
  drawDisplay(value);
}, { deep: true, immediate: true})

let v = 1000;
let h = 500;
let vConst = (Math.PI*2/v);
let hConst = h/16


function drawDisplay(waveFunc) {
  const ctx = getContext();
  if (ctx) {
    clearCanvas(ctx);
    drawGrid(ctx);
    drawWave(waveFunc, ctx);
  }
}

function getContext() {
  const canvas = document.getElementById('display-canvas');
  return canvas ? canvas.getContext('2d') : null;
}

function clearCanvas(ctx) {
  ctx.clearRect(0, 0, v, h);
}

function drawGrid(ctx) {
  ctx.beginPath();
  // Draw vertical lines
  for(let x = 0; x <= v; x += v/32) {
    ctx.moveTo(x, h);
    ctx.lineTo(x, 0);
  }

  // Draw horizontal lines
  for(let y = 0; y <= h; y += h/16) {
    ctx.moveTo(v, y);
    ctx.lineTo(0, y);
  }

  // Draw grid
  ctx.strokeStyle = `rgb(0 50 0)`;
  ctx.lineWidth = 1;
  ctx.stroke(); // strokes the drawing to the canvas

  ctx.beginPath();
  // Draw center line
  ctx.moveTo(0, h/2);
  ctx.lineTo(v, h/2);

  // Draw center line
  ctx.moveTo(v/2, 0);
  ctx.lineTo(v/2, h);

  // Draw origin
  ctx.strokeStyle = `rgb(0 150 0)`;
  ctx.lineWidth = 1;
  ctx.stroke(); // strokes the drawing to the canvas
}
function drawWave(waveFunc, ctx) {
  ctx.beginPath();

  for(let x=0; x<=v; x+=1) {
    let ys = waveFunc.map((func) => func.a*hConst*Math.sin(func.b*vConst*x+(func.c*Math.PI/2)));

    let y = h/2 - ys.reduce((a,b) => a+b);
    // let y = h/2 - waveFunc.value.a*hConst*Math.sin(waveFunc.value.b*vConst*x+(waveFunc.value.c*Math.PI/2));
    ctx.lineTo(x,y);
  }


  ctx.strokeStyle = `rgb(200 255 200)`;
  ctx.lineWidth = 2;
  ctx.stroke(); // strokes the drawing to the canvas
  ctx.strokeStyle = `rgb(0 255 0)`;
  ctx.lineWidth = 1;
  ctx.stroke(); // strokes the drawing to the canvas
}

onMounted(() => {
  drawDisplay(props.waveFunc);
})

</script>

<template>
  <div class="display-container">
    <canvas id="display-canvas" width="1000" height="500"></canvas>
  </div>
</template>

<style scoped>
  .display-container {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid grey;
  }
</style>