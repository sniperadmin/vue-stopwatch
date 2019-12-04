<template>
  <div class="pack">
    <div class="timer">
      <h3>This material is programmed by &copy; 2019 Nasr Galal</h3>
      <h3>content revised and authorized by <a :href="coretabs">Coretabs Academy</a></h3>
      <p class="thanks">
        <strong>VueJS Stopwatch</strong>
      </p>
      <p class="thanks">
        <strong>Special thanks to</strong>
      </p>
      <p class="thanks">Mona Galal</p>
      <div class="timer__controls">
        <button data-time="20" class="timer__button" @click="startTimer">20 Secs</button>
        <button @click="startTimer" data-time="300" class="timer__button">Work 5</button>
        <button @click="startTimer" data-time="900" class="timer__button">Quick 15</button>
        <button @click="startTimer" data-time="1200" class="timer__button">Snack 20</button>
        <button @click="startTimer" data-time="3600" class="timer__button">Long {{chosenValue}}</button>
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
        <p class="display__end-time">Break ends at {{ endTime }}</p>
      </div>
      <h3>This material is programmed by &copy; 2019 Nasr Galal</h3>
    </div>
    <audio ref="beebSound" src="https://www.soundjay.com/button/beep-22.wav" autostart="false"></audio>
    <audio ref="startSound" src="https://www.soundjay.com/button/button-34.wav" autostart="false"></audio>
  </div>
</template>

<script>
// Setting Variables
let countdown; // storing setInterval in this function to be able to stop it at zero.
const { responsiveVoice } = window;

export default {
  name: "Timer",
  data() {
    return {
      showTimer: `00:00`,
      endTime: `00:00`,
      seconds: 0,
      minutes: 0,
      enteredMins: '',
      chosenValue: 'break',
      options: ['break', 'mission', 'deadline'],
      coretabs: 'https://forums.coretabs.net/t/سلسلة-التحدي-الأسبوعي-التحدي-3/3578/12'
    }
  },
  methods: {
    handleOptions (event) {
      this.chosenValue = event.target.value
    },
    // Resetting mechanism
    reset() {
      this.timeStop();
      this.showTimer = `00:00`
      responsiveVoice.cancel()
    },
    timeStop() {
      clearInterval(countdown)
    },
    displayTimeLeft(seconds) {
      this.minutes = Math.floor(seconds / 60)
      const secondsLeft = seconds % 60
      this.showTimer = `${this.minutes < 10 ? 0 : ''}${this.minutes}:${
        secondsLeft < 10 ? 0 : ''
      }${secondsLeft}`
      //***************** UPDATED *********************

      // voice alarm for each minute
      if (secondsLeft === 0 && this.minutes !== 0) {
        responsiveVoice.speak(
          `${this.minutes} minutes remaining | till ${this.chosenValue} ends`
        );
      } else if (secondsLeft === 20 && this.minutes === 0) {
        responsiveVoice.speak(`20 seconds remaining`)
      } else if (this.minutes === 0 && secondsLeft === 0) {
        responsiveVoice.speak(
          `Your Break Has Finished. Hurry up before you get fired! Thank you for using our services`
        );
      } else if (this.minutes === 0 && secondsLeft < 11) {
        responsiveVoice.speak(`${secondsLeft}`);
      }
    },
    displayEndTime(timestamp) {
      const end = new Date(timestamp)
      const hour = end.getHours()
      const CorrHours = hour > 12 ? hour - 12 : hour
      const minutes = end.getMinutes()
      this.endTime = `${CorrHours < 10 ? 0 : ''}${CorrHours}:${
        minutes < 10 ? 0 : ''
      }${minutes}`
    },
    startTimer(x) {
      this.reset()
      this.$refs.startSound.play()
      const targetSec = parseInt(x.target.dataset.time)
      this.timer(targetSec)
    },
    // timer mechanics
    timer(seconds) {
      this.reset()
      //constants
      const now = Date.now()
      const then = now + seconds * 1000
      this.displayTimeLeft(seconds)
      this.displayEndTime(then)
      //setting animation in one second and storing it in a variable (countdown)
      //to be able to clearInterval after it reaches zero
      countdown = setInterval(() => {
        const remainedSeconds = Math.round((then - Date.now()) / 1000)
        //Checking when to stop the function
        if (remainedSeconds < 0) {
          clearInterval(countdown)
          return
        }
        //installing beeb sound
        if (remainedSeconds < 11) {
          for (let sec in remainedSeconds) {
            responsiveVoice.speak(`${sec}`)
          }
          this.$refs.beebSound.play()
        }
        // changing colors once reaching 10 seconds (needs fixing!)
        // if (remainedSeconds <= 11) {
        // not programmed yet
        // }

        //Displaying timer
        this.displayTimeLeft(remainedSeconds)
      }, 1000)
    },
    submitMins(e) {
      e.preventDefault()
      this.reset()
      const mins = this.enteredMins
      this.timer(mins * 60)
      this.showTimer = `${mins}`
    }
  }
}
</script>

<style scoped>
  a:link {
    color: aquamarine;
  }
</style>
