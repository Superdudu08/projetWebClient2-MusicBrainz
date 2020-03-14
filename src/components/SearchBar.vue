<template>
  <div class="searchBarContainer"   @keyup.enter="sendSearchQuery">
      <input v-model="searchInputValue" type="text" autofocus placeholder="Recherchez un artiste, un album..."><button v-on:click="sendSearchQuery()" class="btn btn-outline-dark"><i class="fal fa-arrow-right"></i></button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data () {
    return {
      searchInputValue: ""
    }
  },
  methods: {
      sendSearchQuery(){
          axios.get('http://musicbrainz.org/ws/2/artist/?query=artist:' + this.searchInputValue + '&fmt=json')
          .then(response => console.log(response))
          axios.get('http://musicbrainz.org/ws/2/recording/?query=recording:'+ this.searchInputValue +'&fmt=json')
          .then(response => console.log(response))
          axios.get('http://musicbrainz.org/ws/2/recording/?query=artistname:' + this.searchInputValue + '&fmt=json')
          .then(response => console.log(response))
      }
  }
}
</script>

<style lang="scss">

.searchBarContainer {
    width:80%;
    height:100px;
    display: flex;
}

input {
    width: 90%;
    height:100%;
    font-size:2rem;
}

.btn {
    height: 100%;
    width: 10%;
    font-size:3rem;
    background-color:darkgray;
}
</style>
