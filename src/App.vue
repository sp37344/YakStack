<template>
  <div id="app">
    <landing v-if="! blockstack.isUserSignedIn()"></landing>
    <router-view v-if="user" :user="user"></router-view>
  </div>
</template>

<script>

import firebase from 'firebase'
var config = {
  apiKey: 'AIzaSyBG_iZYxJ6s-N0wqkdQ78sLys9SnU42oIc',
  authDomain: 'yakstack-iw.firebaseapp.com',
  databaseURL: 'https://yakstack-iw.firebaseio.com',
  projectId: 'yakstack-iw',
  storageBucket: 'yakstack-iw.appspot.com',
  messagingSenderId: '697829824019'
}
firebase.initializeApp(config)

import Landing from './components/Landing.vue'
import Dashboard from './components/Dashboard.vue'
import Yaks from './components/Yaks.vue'
import Hot from './components/Hot.vue'

export default {
  name: 'app',
  components: {Landing, Dashboard, Yaks, Hot},
  mounted () {
    const blockstack = this.blockstack
    if (blockstack.isUserSignedIn()) {
      this.userData = blockstack.loadUserData()
      this.user = new blockstack.Person(this.userData.profile)
      this.user.username = this.userData.username
      console.log(this.userData)
      firebase.database().ref().child('users').child(this.user.username.substring(0, this.user.username.length - 3)).set(this.user.username)
    } else if (blockstack.isSignInPending()) {
      blockstack.handlePendingSignIn('http://localhost:6270/v1/names/')
      .then((userData) => {
        window.location = window.location.origin
      })
    }
  },
  data () {
    return {
      userList: [],
      blockstack: window.blockstack,
      user: null
    }
  }
}
</script>

<style src="./assets/sass/app.scss" lang="scss"></style>
