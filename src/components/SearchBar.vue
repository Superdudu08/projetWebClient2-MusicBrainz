<template>
  <div class="searchBarContainer"   @keyup.enter="sendSearchQuery">
      <input v-model="searchInputValue" type="text" autofocus placeholder="Recherchez un artiste, un album..."><button class="btn btn-outline-dark"><i class="fal fa-arrow-right"></i></button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchInputValue: ""
    }
  },
  methods: {
      sendSearchQuery(){
          console.log('Recherche lancée sur ' + this.searchInputValue)
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
