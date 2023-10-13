<script setup>
import { ref, onMounted, computed,  watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const data = computed(()=>store.getters.getData);
const audioRef = ref(new Audio());
const currentAudioIndex = ref(0);
const currentTime = ref(0);
const currentTimeTotal = ref(0);
const currentTimeSum = ref(0);
const isPlaying = ref(false);
const totalDuration = computed(() => {
  return data.value.reduce((total, audio) => total + audio.duration, 0);
});
const playAudio = () => {
  isPlaying.value = true;
  audioRef.value.src = require(`@/assets/${data.value[currentAudioIndex.value].audio}`);
  audioRef.value.currentTime = currentTime.value;
  const playPromise = audioRef.value.play();

  if (playPromise !== undefined) {
    playPromise.then(_ => {
      currentTimeSum.value = currentAudioIndex.value > 0 ? data.value[currentAudioIndex.value].from : 0;
      currentTimeTotal.value = currentTime.value + currentTimeSum.value;
    }).catch(error => {
      isPlaying.value = false;
      console.error('Auto-play was prevented:', error);
    });
  }
};
const pauseAudio = () => {
  isPlaying.value = false;
  audioRef.value.pause();
};
const stopAudio = () => {
  isPlaying.value = false;
  audioRef.value.pause();
  currentTime.value = 0;
  audioRef.value.currentTime = 0;
  currentTimeSum.value =   0;
  currentTimeTotal.value = 0;
  audioRef.value.src = require(`@/assets/${data.value[currentAudioIndex.value].audio}`);
  audioRef.value.currentTime = currentTime.value;
};
const seekAudio = () => {
  if (isPlaying.value) {
    pauseAudio();
    playAudio();
  }
};
const clickRange = () =>{
  pauseAudio();
  let val =  currentTimeTotal.value;
  for (let i = 0; i < data.value.length; i++) {
    if(val >= data.value[i].from && val <= data.value[i].to){
      currentAudioIndex.value = i;
      currentTime.value = val - data.value[i].from;
      currentTimeSum.value = data.value[i].from;
    }
  }
}
const updateCurrentTime = () => {
  currentTime.value = Math.floor(audioRef.value.currentTime);
  if (currentTime.value >= data.value[currentAudioIndex.value].duration) {
    if(currentAudioIndex.value == data.value.length-1){
      pauseAudio();
    } else {
      currentAudioIndex.value++;
      currentTime.value = 0;
      currentTimeSum.value =  data.value[currentAudioIndex.value].from;
      currentTimeTotal.value = currentTimeSum.value;
      playAudio();
    }
  }
};

onMounted(() => {
  audioRef.value.addEventListener('timeupdate', updateCurrentTime);
});

watch(
    () => currentTime.value,
    (val) => {
     currentTimeTotal.value = val + currentTimeSum.value;
    }
)

watch(
    () => currentTimeTotal.value,
    (val) => {
      if(val>=totalDuration.value){
        currentTimeTotal.value = totalDuration.value;
      }
    }
)
</script>
<template>
  <div class="audio-player">
    <input type="range" min="0" :max="totalDuration" v-model="currentTimeTotal" @click="clickRange" @input="seekAudio" />
    <div>
      <button @click="playAudio">Play</button>
      <button @click="pauseAudio">Pause</button>
      <button @click="stopAudio">Stop</button>
    </div>
    <p>Time: {{ currentTimeTotal }} seconds</p>
  </div>
</template>
<style scoped>
.audio-player {
  text-align: center;
}
</style>
