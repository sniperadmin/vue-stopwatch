<template>
  <div id="app">
    <Particles/>
    <router-view></router-view>
    <notifications group="pomodro" position="bottom left" />
  </div>
</template>

<script>
import Particles from "./components/Particles"

export default {
  name: "App",
  components: {
    Particles,
  },
  mounted() {
    if (window.Worker) {
      let worker = new Worker('./registerServiceWorker')
      worker.postMessage({
        'cmd': 'meow', 'msg': 'hi'
      })
    }
  }
}

</script>

<style>
#app {
  font-family: "Rajdhani", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* padding-top: 50px; */
}

.timer-position {
  top: 50%;
}
vue-particles {
  min-height: 10vh
}
</style>
