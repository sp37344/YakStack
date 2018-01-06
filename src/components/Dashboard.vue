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
            <b-dropdown-item><router-link to="hot">trending yaks</router-link></b-dropdown-item>
            <b-dropdown-item disabled> | </b-dropdown-item>
            <b-dropdown-item disabled>your profile</b-dropdown-item>
          </b-navbar> 
          <form @submit.prevent="addYak(yaktxt)" :disabled="! yaktxt" style="padding-top: 50px; padding-bottom: 30px">
            <input v-model="yaktxt" type="text" class="form-control" placeholder="Write a yak (press enter to submit)" autofocus>
          </form>
          <ul class="list-group">
            <yaks v-for="yak in myyakdata" :yak="yak"></yaks>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<script>
import Yaks from './Yaks.vue'
import Hot from './Hot.vue'

var STORAGE_FILE = 'yaks.json'

export default {
  name: 'dashboard',
  components: {Yaks, Hot},
  props: ['user'],
  data () {
    return {
      myyakdata: [],
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
    this.fetchData()
  },
  methods: {
    addYak (yaktxt) {
      this.myyakdata.unshift({
        post: yaktxt,
        votes: 0,
        upvoted: false,
        downvoted: false
      })
      this.yaktxt = ''
    },
    fetchData () {
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
      // this.blockstack.signUserOut(window.location.href)
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

input::placeholder {
    color: #696969;
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: lighter;
}

input {
  color: #696969;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: lighter;
  border-radius: 50px;
  width: 100%;
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
