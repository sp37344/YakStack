<template>
  <div class="hello">
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-md-offset-2">
          <h1>YakStak
            <small><span class="sign-out">(<a href="#" @click.prevent="signOut" style="font-family: Quicksand">Sign Out</a>)</span></small>
          </h1>
          <h2 class="user-info">
            <small>User Profile: 
            {{ user.username ? user.username : user.identityAddress }}
            <p>
              <router-link to="hot">see trending yaks</router-link>
            </p>
            </small>
          </h2>
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
@import url('https://fonts.googleapis.com/css?family=Kaushan+Script');
@import url('https://fonts.googleapis.com/css?family=Oxygen');
@import url('https://fonts.googleapis.com/css?family=Cabin');
@import url('https://fonts.googleapis.com/css?family=Quicksand');

h1 {
    color: #40e0d0;
    font-size: 3em;
    font-family: 'Megrim', sans-serif;
}

h2 {
    color: #f7f7f7;
    font-size: 3em;
    font-family: 'Quicksand', sans-serif;
}

h3 {
    color: white;
}

button {
  background-color: #40e0d0;
  border: none;

  &:hover {
    background-color: lighten(#40e0d0, 15%);
  }

  &:active {
    background-color: lighten(#40e0d0, 20%);
  }
}

input::placeholder {
    color: #696969;
    font-family: 'Cabin', sans-serif;
    font-weight: lighter;
}

input {
  color: #696969;
  font-family: 'Cabin', sans-serif;
  font-weight: lighter;
}


.list-group-item {
  &.completed label {
    text-decoration: line-through;
  }

  .delete {
    display: none;
  }

  &:hover .delete {
    display: inline;
    color: grey;
    &:hover {
      text-decoration: none;
      color: red;
    }
  }
}

a {
  padding-left: 5px;
}

</style>
