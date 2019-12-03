/* eslint-disable no-undef */
// [START initialize_firebase_in_sw]
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.

// Initialize the Firebase app in the service worker by passing in the messagingSenderId.

// firebase.initializeApp({
//   'messagingSenderId': '497007181926'
// })

// Retrieve an instance of Firebase Messaging so that it can handle background messages.

// const messaging = firebase.messaging()

// [END initialize_firebase_in_sw]

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.setBackgroundMessageHandler` handler.

// messaging.onMessage((payload) => {
  // console.log('Message received. ', payload);
//   Vue.notify({
//     group: 'foo',
//     title: 'FB messaging',
//     text: `Message received! => ${payload}`
//   })
// })
