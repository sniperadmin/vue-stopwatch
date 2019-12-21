<template>
    <div v-if="notificationsSupported" class="push">
        <button @click="askPermission" class="timer__button" :disabled="disabled">{{ buttonMsg }}</button>
    </div>
</template>

<script>
    export default {
        name: 'push-notification',
        data() {
            return {
                notificationsSupported: false,
                buttonMsg: 'Enable Notifications',
                disabled: false,
            }
        },
        methods: {
            askPermission() {
                this.disabled = true
                this.buttonMsg = 'You have enabled the notifications'
                if (this.notificationsSupported) {
                    Notification.requestPermission(result => {
                        // console.log('result from permission question', result);
                        if (result !== 'granted') {
                            alert('You probably do not like notifications?!');
                        } else {
                            // console.log(
                            //     'A notification will be send from the service worker => This only works in production'
                            //     );
                            this.showNotification()
                        }
                    })
                }
            },
            showNotification() {
                if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.ready // returns a Promise, the active SW registration
                        .then(swreg => swreg.showNotification(`Notifications granted`, {
                            body: `Here is a first notification`,
                            icon: '/img/icons/android-chrome-192x192.png',
                            image: '/img/autumn-forest.png',
                            vibrate: [300, 200, 300],
                            badge: '/img/icons/plint-badge-96x96.png',
                            // actions: [
                            //     { action: 'confirm', title: 'Okay', icon: '/img/icons/android-chrome-192x192.png'},
                            //     { action: 'cancel', title: 'Cancel', icon: '/img/icons/android-chrome-192x192.png'}
                            // ],
                        }))
                        .then(swreg => {
                            // break 1
                            this.$on('shortBreak1', () => {
                                swreg.showNotification(`Short break 1`, {
                                    body: `Short break 1 started (5 minutes)`,
                                    icon: '/img/icons/android-chrome-192x192.png',
                                    image: '/img/autumn-forest.png',
                                    vibrate: [300, 200, 300],
                                    badge: '/img/icons/plint-badge-96x96.png',
                                })
                            })
                            // stage 2
                            this.$on('stageTwo', () => {
                                swreg.showNotification(`Pomodro Stage 2`, {
                                    body: `Stage 2 started (25 minutes)`,
                                    icon: '/img/icons/android-chrome-192x192.png',
                                    image: '/img/autumn-forest.png',
                                    vibrate: [300, 200, 300],
                                    badge: '/img/icons/plint-badge-96x96.png',
                                })
                            })
                            // short break 2
                            this.$on('stageTwo', () => {
                                swreg.showNotification(`short break 2`, {
                                    body: `short break 2 started (5 minutes)`,
                                    icon: '/img/icons/android-chrome-192x192.png',
                                    image: '/img/autumn-forest.png',
                                    vibrate: [300, 200, 300],
                                    badge: '/img/icons/plint-badge-96x96.png',
                                })
                            })
                            // stage 3
                            this.$on('stageTwo', () => {
                                swreg.showNotification(`Pomodro Stage 3`, {
                                    body: `Stage 3 started (25 minutes)`,
                                    icon: '/img/icons/android-chrome-192x192.png',
                                    image: '/img/autumn-forest.png',
                                    vibrate: [300, 200, 300],
                                    badge: '/img/icons/plint-badge-96x96.png',
                                })
                            })
                            // short break 3
                            this.$on('stageTwo', () => {
                                swreg.showNotification(`short break 3`, {
                                    body: `short break 3 started (5 minutes)`,
                                    icon: '/img/icons/android-chrome-192x192.png',
                                    image: '/img/autumn-forest.png',
                                    vibrate: [300, 200, 300],
                                    badge: '/img/icons/plint-badge-96x96.png',
                                })
                            })
                            // stage 4
                            this.$on('stageTwo', () => {
                                swreg.showNotification(`Pomodro Stage 4`, {
                                    body: `Stage 4 started (25 minutes)`,
                                    icon: '/img/icons/android-chrome-192x192.png',
                                    image: '/img/autumn-forest.png',
                                    vibrate: [300, 200, 300],
                                    badge: '/img/icons/plint-badge-96x96.png',
                                })
                            })
                            // short break 4
                            this.$on('stageTwo', () => {
                                swreg.showNotification(`short break 4`, {
                                    body: `short break 4 started (5 minutes)`,
                                    icon: '/img/icons/android-chrome-192x192.png',
                                    image: '/img/autumn-forest.png',
                                    vibrate: [300, 200, 300],
                                    badge: '/img/icons/plint-badge-96x96.png',
                                })
                            })
                            // ******************************



                        })
                }
            },
        },
        created() {
            if ('Notification' in window && 'serviceWorker' in navigator) {
                this.notificationsSupported = true
            }
        },
    }
</script>

<style scoped>

</style>