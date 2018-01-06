<template>
  <div class="hello">
    <div class="container" style="padding: 20px">
      <div class="row">
        <span class="sign-out">
            <a href="#" @click.prevent="signOut" style="font-family: Quicksand">Sign Out</a>
        </span>
        <span class="sign-out" style="font-family: Quicksand; color: #696969">
          {{ user.username ? user.username : user.identityAddress }}
        </span>
        <div class="col-md-8 col-md-offset-2">
          <h1>YakStak</h1>
          <b-navbar class="nav navbar-nav">
            <b-dropdown-item disabled>trending yaks</b-dropdown-item>
            <b-dropdown-item disabled> | </b-dropdown-item>
            <b-dropdown-item><router-link to="self">your profile</router-link></b-dropdown-item>
          </b-navbar>                  
          <ul class="list-group" style="padding-top: 50px">
            <yaks v-for="yak in yakdata" :yak="yak"></yaks>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<script>
import firebase from 'firebase'
import Yaks from './Yaks.vue'
import Hot from './Hot.vue'

var STORAGE_FILE = 'yaks.json'

export default {
  name: 'dashboard',
  components: {Yaks, Hot, firebase},
  props: ['user'],
  data () {
    return {
      myyakdata: [],
      yakdata: [],
      yaktxt: '',
      votes: 0,
      upvoted: false,
      downvoted: false,
      blockstack: window.blockstack
    }
  },
  watch: {
    myyakdata: {
      handler: function (myyakdata) {
        const blockstack = this.blockstack
        let options = {
          encrypt: false,
          public: true
        }
        return blockstack.putFile(STORAGE_FILE, JSON.stringify(myyakdata), options)
      },
      deep: true
    }
  },
  mounted () {
    this.fetchMyData()
    this.getAllYaks()
  },
  methods: {
    getAllYaks () {
      var userList = []
      var urlRef = firebase.database().ref().child('users')
      urlRef.once('value', function (snapshot) {
        snapshot.forEach(function (kid) {
          userList.push(kid.val())
          console.log(kid.val())
        })
      })
      .then(() => {
        console.log(userList.length)
        for (var i = 0; i < userList.length; i++) {
          this.fetchData(userList[i])
        }
      })
    },
    addYak (yaktxt) {
      this.myyakdata.unshift({
        post: yaktxt,
        votes: 0,
        upvoted: false,
        downvoted: false
      })
      this.yaktxt = ''
    },
    fetchData (userN) {
      const blockstack = this.blockstack
      let options = {
        decrypt: false,
        user: userN,
        app: 'http://localhost:8080'
      }
      blockstack.getFile(STORAGE_FILE, options)
      .then((yakData) => {
        var parsedYaks = JSON.parse(yakData || '[]')
        parsedYaks.forEach(function (yak) {
          yak.upvoted = false
          yak.downvoted = false
        })
        this.yakdata = this.yakdata.concat(parsedYaks)
      })
    },
    fetchMyData () {
      const blockstack = this.blockstack
      let options = {
      }
      blockstack.getFile(STORAGE_FILE, options)
      .then((myyakdata) => {
        var parsedYaks = JSON.parse(myyakdata || '[]')
        parsedYaks.forEach(function (yak) {
        })
        this.myyakdata = parsedYaks
      })
    },
    signOut () {
      this.blockstack.signUserOut('http://localhost:8080/#/signin')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

@import url('https://fonts.googleapis.com/css?family=Megrim');
@import url('https://fonts.googleapis.com/css?family=Quicksand');
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

h1 {
    color: #40e0d0;
    font-size: 3em;
    font-family: 'Megrim', sans-serif;
    text-align: center;
    padding-top: 5px;
}

b-dropdown-item {
  font-family: 'Quicksand', sans-serif;
  color: #696969;
  font-size: 1em;
  padding: 1%;
}

.navbar-nav {
  width: 100%;
  text-align: center;
}

</style>
