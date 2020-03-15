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
      searchInputValue: "",
      minimumAcceptedScoreArtist: 99,
      minimumAcceptedScoreRecording: 80,
    }
  },
  methods: {
      sendSearchQuery(){
          this.$emit('newQueryStarted');
          axios.get('http://musicbrainz.org/ws/2/artist/?query=artist:' + this.searchInputValue + '&fmt=json')
          .then(response => this.manageArtistData(response))
          axios.get('http://musicbrainz.org/ws/2/recording/?query=recording:'+ this.searchInputValue +'&fmt=json')
          .then(response => this.manageRecordingData(response))
          axios.get('http://musicbrainz.org/ws/2/recording/?query=artistname:' + this.searchInputValue + '&fmt=json')
          .then(response => this.manageRecordingData(response))
      },
      manageArtistData(response){
        // Récupère la réponse de l'API concernant les artistes et envoie les résultats pertinents à la home page
        const newQueryResults = []
        for(const artist of response.data.artists) {
          if(artist.score > this.minimumAcceptedScoreArtist && newQueryResults.length<8) {
            newQueryResults.push({
              name: artist.name,
              type: "artist",
              mbid: artist.id
            })
          }
        }
        if(newQueryResults.length>0) {
          this.$emit('newQueryResultsReceived', newQueryResults);
        }
      },
      manageRecordingData(response){
        // Récupère la réponse de l'API concernant les recording et envoie les résultats pertinents à la home page
        const newQueryResults = []
        for(const recording of response.data.recordings) {
          if(recording.score > this.minimumAcceptedScoreRecording && newQueryResults.length<8) {
            console.log(recording)
            newQueryResults.push({
              name: recording.title,
              type: "recording",
              mbid: recording.id,
              releaseid: recording.releases[0].id
            })
          }
        }
        if(newQueryResults.length>0) {
          this.$emit('newQueryResultsReceived', newQueryResults);
        }
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
