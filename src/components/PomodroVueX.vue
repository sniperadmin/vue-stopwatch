<template>
  <div class="pack">
    <div class="timer">
      <PushNotification />
      
      <h3>This material is programmed by &copy; 2019 Nasr Galal</h3>
      <h3>content revised and authorized by <a :href="coretabs">Coretabs Academy</a></h3>

      <button  @click="visitVuejsVersion" class="timer__button">Go to Vuejs version</button>
      <p class="thanks">
        <strong>VueJS Stopwatch <small style="color: rgba(0,200,0,0.7)">[Vuex mode]</small></strong>
      </p>
      <p class="thanks">
        <strong>Special thanks to</strong>
      </p>
      <p class="thanks">Mona Galal</p>
        <button @click="runPomodro" class="timer__button">Start Pomodro Mode <small>(not ready)</small></button>
      <div class="timer__controls">
        <button ref="twenty" data-time="20" class="timer__button" @click="startTimer">20 Secs</button>
        <button ref="five" @click="startTimer" data-time="300" class="timer__button">Work 5</button>
        <button ref="fifteen" @click="startTimer" data-time="900" class="timer__button">Quick 15</button>
        <button ref="work" @click="startTimer" data-time="1500" class="timer__button">Snack 25</button>
        <button ref="thirty" @click="startTimer" data-time="1800" class="timer__button">Long {{chosenValue}}</button>
        <form @submit="submitMins" name="customForm">
          <input v-model="enteredMins" type="number" name="minutes" placeholder="Enter Minutes and press Enter to begin">
          <select :value="chosenValue" @change="handleOptions">
            <option v-for="(option, index) in options" :key="index" :value="option">{{ option }}</option>
          </select>
        </form>
      </div>
      <div class="display">
        <h1 class="display__time-left">{{ showTimer }}</h1>
        <button @click="reset" class="stop">Stop timer</button>
        <p class="display__end-time">{{chosenValue}} ends at {{ endTime }}</p>
        <p v-if="pomodro = true">
          <!-- add sections on here -->
        </p>
      </div>
      <h3>This material is programmed by &copy; 2019 Nasr Galal</h3>
    </div>
    <audio ref="beebSound" src="https://www.soundjay.com/button/beep-22.wav" autostart="false"></audio>
    <audio ref="startSound" src="https://www.soundjay.com/button/button-34.wav" autostart="false"></audio>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapMutations,
    // mapActions
  } from "vuex"

  import PushNotification from "@/components/PushNotification"


  export default {
    name: 'pomodro-vue-x',
    components: {
      PushNotification,
    },
    data() {
      return {
        enteredMins: '',
        // chosenValue: 'break',
        coretabs: 'https://forums.coretabs.net/t/سلسلة-التحدي-الأسبوعي-التحدي-3/3578/12'
      }
    },
    methods: {
      visitVuejsVersion () {
        this.$router.push('/')
      },
      handleOptions (event) {
        this.$store.commit('handleOptions', event.target.value)
      },
      runPomodro () {

      },
      timeStop () {

      },
      startTimer (x) {
        this.reset()
        const targetSec = parseInt(x.target.dataset.time)
        let beeb = this.$refs.beebSound
        this.$store.dispatch('timer', {targetSec, beeb})
        let ref = this.$refs.startSound
        ref.play()
      },
      submitMins () {

      },
      ...mapMutations({
        reset: 'reset',
        
      }),
    //   ...mapActions({
    //     timer: `timer`,
    //   })
    },
    computed: {
      ...mapGetters({
        showTimer: 'showTimer',
        endTime: 'endTime',
        options: 'getOptions',
        chosenValue: 'getChosenValue'
      })
    }
  }
</script>

<style lang="scss" scoped>

</style>