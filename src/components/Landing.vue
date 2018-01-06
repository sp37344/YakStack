<template>
  <div class="hello">
    <div> 
      <h1>Yakstack</h1>
      <p>A decentralized Yik Yak built on <a href="https://blockstack.org" target="_blank">Blockstack</a></p>
      <div style="text-align:center">
        <button class="signin" @click.prevent="signIn">Sign In With Blockstack</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'landing',
  data () {
    return {
      blockstack: window.blockstack
    }
  },

  methods: {
    signIn () {
      const blockstack = this.blockstack
      const permissions = ['app_index']
      blockstack.redirectToSignIn(undefined, undefined, permissions)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Megrim');
@import url('https://fonts.googleapis.com/css?family=Quicksand');

.hello {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

h1 {
  color: #40e0d0;
  font-size: 3em;
  font-family: 'Megrim', sans-serif;
  text-align: center;
}

p {
  font-family: 'Quicksand';
  font-weight: lighter;
}

.signin {
  border-radius: 50px;
  padding: 15px;
  justify-content: center;
  border: 1px solid #696969;
  background-color: transparent;
  font-family: 'Quicksand';
  font-weight: lighter;
}

.signin:hover {
  border: 1px solid #40e0d0;
}

</style>
