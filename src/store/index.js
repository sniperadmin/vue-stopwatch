import Vue from 'vue'
import Vuex from 'vuex'
// let countdown
const { responsiveVoice } = window

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    countdown: null,
    showTimer: `00:00`,
    endTime: `00:00`,
    seconds: 0,
    minutes: 0,
    options: ['break', 'mission', 'deadline'],
    chosenValue: 'break',
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
  },
  mutations: {
    handleOptions: (state, payload) => {
      state.chosenValue = payload
    },
    reset(state) {
      console.log('resetting function')
      clearInterval(state.countdown)
      responsiveVoice.cancel()
      return state.showTimer = `00:00`
    },
    clearInt: (state) => { // just to clear interval
      clearInterval(state.countdown)
    },
    // PomodroTrue: (state) => {
    //   return state.pomodroMode = true
    // },
    dataDefine: (state, payload) => {
      state.seconds = payload
    },
    settingNewCountdown(state, then) {
      state.countdown = setInterval(() => {
        const remainedSeconds = Math.round((then - Date.now()) / 1000)
        // dispatch watcher from here!
        this.dispatch('counterWatcher', remainedSeconds)
      }, 1000)
    },
    displayTimeLeft(state, seconds) {
      state.minutes = Math.floor(seconds / 60)
      const secondsLeft = seconds % 60
      state.showTimer = `${state.minutes < 10 ? 0 : ''}${state.minutes}:${
        secondsLeft < 10 ? 0 : ''
      }${secondsLeft}`
      //***************** UPDATED *********************

      // voice alarm for each minute
      if (secondsLeft === 0 && state.minutes !== 0) {
        responsiveVoice.speak(
          `${state.minutes} minutes remaining | till ${state.chosenValue} ends`
        );
      } else if (secondsLeft === 20 && state.minutes === 0) {
        responsiveVoice.speak(`20 seconds remaining`)
      } else if (state.minutes === 0 && secondsLeft === 0) {
        // responsiveVoice.speak(`Your Break Has Finished. Hurry up before you get fired! Thank you for using our services`)
      } else if (state.minutes === 0 && secondsLeft < 11) {
        responsiveVoice.speak(`${secondsLeft}`);
      }
    },
    displayEndTime(state, timestamp) {
      const end = new Date(timestamp)
      const hour = end.getHours()
      const CorrHours = hour > 12 ? hour - 12 : hour
      const minutes = end.getMinutes()
      state.endTime = `${CorrHours < 10 ? 0 : ''}${CorrHours}:${
        minutes < 10 ? 0 : ''
      }${minutes}`
    },
  },
  actions: {
    timer: ({commit}, seconds) => {
      commit('displayTimeLeft', seconds)
      commit('dataDefine', seconds)
       //constants
       const now = Date.now()
       const then = now + seconds * 1000
      //  this.displayTimeLeft(seconds)
      //  this.displayEndTime(then)
      commit('settingNewCountdown', then)
      commit('displayEndTime', then)
      //setting animation in one second and storing it in a variable (countdown)
      //to be able to clearInterval after it reaches zero
    },
    counterWatcher: ({commit}, remainedSeconds) => {
      //Checking when to stop the function
      if (remainedSeconds < 0) {
        commit('clearInt')
        return
      }
     
      //installing beeb sound
      if (remainedSeconds < 11) {
        for (let sec in remainedSeconds) {
          responsiveVoice.speak(`${sec}`)
        }
        // this.$refs.beebSound.play()
      }
      // changing colors once reaching 10 seconds (needs fixing!)
      if (remainedSeconds <= 11) {
        // not programmed yet
      }
      console.log(remainedSeconds)
      // Displaying timer
      commit('displayTimeLeft', remainedSeconds)
    }
  },
  getters: {
    showTimer: (state) => { return state.showTimer },
    endTime: (state) => { return state.endTime },
    getOptions: (state) => { return state.options },
    getChosenValue: (state) => { return state.chosenValue }
  }
})
