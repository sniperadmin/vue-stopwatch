<template>
  <div class="pack">
    <div class="timer">
      <PushNotification />
      
      <h3>This material is programmed by &copy; 2019 Nasr Galal</h3>
            
      <!-- go to vueX version! -->
      <button 
        @click="visitVuexVersion"
        class="timer__button"
        style="color: rgba(0,200,0,0.7)"
      >
        <strong>
          Go to VueX version
        </strong>
      </button>

      <h3>content revised and authorized by <a :href="coretabs">Coretabs Academy</a></h3>
      <p class="thanks">
        <strong>VueJS Stopwatch</strong>
      </p>
      <p class="thanks">
        <strong>Special thanks to</strong>
      </p>
      <p class="thanks">Mona Galal</p>
        <button  @click="runPomodro" class="timer__button">Start Pomodro Mode</button>
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
  import PushNotification from "@/components/PushNotification"

  // Setting Variables
  let countdown; // storing setInterval in this function to be able to stop it at zero.
  const { responsiveVoice } = window;

export default {
  name: "Timer",
  components: {
    PushNotification,
  },
  data() {
    return {
      showTimer: `00:00`,
      endTime: `00:00`,
      seconds: 0,
      minutes: 0,
      enteredMins: '',
      chosenValue: 'break',
      options: ['break', 'mission', 'deadline'],
      coretabs: 'https://forums.coretabs.net/t/سلسلة-التحدي-الأسبوعي-التحدي-3/3578/12',
      pomodroMode: false,
      // stageOne: true,
      stageTwo: false,
      stageThree: false,
      stageFour: false,
      fiveBreak1: false,
      fiveBreak2: false,
      fiveBreak3: false,
      longBreak: false,
      // pomodroHistory: []
    }
  },
  methods: {
    visitVuexVersion () {
      this.$router.push('/vuex-version')
    },
    handleOptions (event) {
      this.chosenValue = event.target.value
    },
    shortBreak () {
      this.$on('shortBreak1', () => {
        // console.log('five mins break')
        this.$notify({
          group: 'pomodro',
          type: 'warn',
          title: 'break!',
          text: 'First short 5 minutes break started!'
        })
        this.$refs.five.click()
        this.fiveBreak1 = false
      })
      this.$on('shortBreak2', () => {
        // console.log('five mins break')
        this.$notify({
          group: 'pomodro',
          type: 'warn',
          title: 'break!',
          text: 'Second short 5 minutes break started!'
        })
        this.$refs.five.click()
        this.fiveBreak2 = false
      })
      this.$on('shortBreak3', () => {
        // console.log('five mins break')
        this.$notify({
          group: 'pomodro',
          type: 'warn',
          title: 'break!',
          text: 'Third short 5 minutes break started!'
        })
        this.$refs.five.click()
        this.fiveBreak3 = false
      })
    },
    thirtyBreak () {
      this.$on('longBreak', () => {
        // console.log('long break time')
        this.$notify({
          group: 'pomodro',
          type: 'warn',
          title: 'break!',
          text: 'Long 30 minutes break started!'
        })
        this.$refs.thirty.click()
        this.longBreak = false
      })
    },
    runPomodro () {
      this.pomodroMode = true //running pomodro mode

      // notification
      this.$notify({
        group: 'pomodro',
        type: 'warn',
        title: 'pomodro started!',
        text: 'Pomodro mode started!'
      })

      // stage 1
      // console.log('stage 1')
      this.$notify ({
        group: 'pomodro',
        type: 'success',
        title: 'stage 1',
        text: 'stage 1 started!'
      })
      this.$refs.work.click()

      // five minutes break
      this.fiveBreak1 = true
      this.shortBreak()

      // stage 2
      this.stageTwo = true
      this.$on('stageTwo', () => {
        this.$notify({
          group: 'pomodro',
          type: 'info',
          title: 'stage 2',
          text: 'stage 2 started started!'
        })
        // console.log('stage 2')
        this.$refs.work.click()
        this.stageTwo = false
      })

      // five minutes break
      this.fiveBreak2 = true
      this.shortBreak()

      // stage 3
      this.stageThree = true
      this.$on('stageThree', () => {
        this.$notify({
          group: 'pomodro',
          type: 'info',
          title: 'stage 3',
          text: 'stage 3 started started!'
        })
        // console.log('stage 3')
        this.$refs.work.click()
        this.stageThree = false
      })

      // five minutes break
      this.fiveBreak3 = true
      this.shortBreak()

      // stage 4
      this.stageFour = true
      this.$on('stageFour', () => {
        this.$notify({
          group: 'pomodro',
          type: 'info',
          title: 'stage 4',
          text: 'stage 4 started started!'
        })
        // console.log('stage 4')
        this.$refs.work.click()
        this.stageFour = false
      })

      // long break
      this.longBreak = true
      this.thirtyBreak()

      // closing pomodro mode
      // this.pomodroMode = false
    },

    // Resetting mechanism
    reset() {
      this.timeStop()
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
        // responsiveVoice.speak(`Your Break Has Finished. Hurry up before you get fired! Thank you for using our services`)
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
        // ... what's next
        if (remainedSeconds == 0 && this.pomodroMode === true){
            // console.log('pomodro active')

            if (this.fiveBreak1)
              this.$emit('shortBreak1')
            else if (this.stageTwo)
                this.$emit('stageTwo')
            else if (this.fiveBreak2)
              this.$emit('shortBreak2')
            else if (this.stageThree)
              this.$emit('stageThree')
            else if (this.fiveBreak3)
              this.$emit('shortBreak3')
            else if (this.stageFour)
              this.$emit('stageFour')
            else if (this.longBreak)
              this.$emit('longBreak')
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
  },
  computed: {},
}
</script>

<style scoped>
  a:link {
    color: aquamarine;
  }
</style>
