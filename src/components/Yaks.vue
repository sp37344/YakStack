
<template id="yaks-template">
  <li class="list-group-item">
    <label class="yakstyle">{{ yak.post }}</label>
    <i class="glyphicon glyphicon-chevron-up" style="color: green" @click="upvote"></i>
    <span class="label">{{ yak.votes }}</span>
    <i class="glyphicon glyphicon-chevron-down" style="color: red" @click="downvote"></i>
  </li>
</template>

<script type="Javascript">
import Dashboard from './Dashboard.vue'

export default {
  name: "yaks",
  template: "#yaks-template",
  props: ['yak'],
  components: {Dashboard},

  methods: {
    upvote () {
      if (this.yak.downvoted)
        this.yak.votes++;
      if (!this.yak.upvoted)
        this.yak.votes++;
      else
        this.yak.votes--;
      this.yak.upvoted = !this.yak.upvoted;
      this.yak.downvoted = false;
    },
    downvote () {
      if (this.yak.upvoted)
        this.yak.votes--;
      if (!this.yak.downvoted)
        this.yak.votes--;
      else
        this.yak.votes++;
      this.yak.downvoted = !this.yak.downvoted;
      this.yak.upvoted = false;
    }
  },
  computed: {
    votes () {
      if (!this.yak.upvoted) {
        this.yak.votes = this.yak.votes + 1;
      } else if (!this.yak.downvoted) {
        this.yak.votes = this.yak.votes - 1;
      } 
      return this.yak.votes;
    }
  }
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<style lang="scss" scoped>

@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

ul>li {
  padding-top: 20px;
  padding-bottom: 20px;
  border: none;
  border-top:1px solid #696969;
  background-color: transparent;
}

ul>li:first-child{
    border-top:0 none;
}

span {
  text-align: right;
  color: 'white';
}

.yakstyle {
  color: white; 
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: lighter;
  margin-bottom: 0;
  width: 85%;
  cursor: pointer;
}

/*.glyphicon {
  opacity: 1;
  transition: opacity .25s ease-in-out;
  -moz-transition: opacity .25s ease-in-out;
  -webkit-transition: opacity .25s ease-in-out;
  color: #15081c;
}

.glyphicon:hover {
  opacity: 0.60;
  cursor: pointer;
}

.glyphicon:active {
  opacity: 0.25;
}*/

</style>
