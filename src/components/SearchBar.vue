<template>
  <div class="searchBarContainer" @keyup.enter="sendSearchQuery">
    <input
      v-model="searchInputValue"
      type="text"
      autofocus
      placeholder="Recherchez un artiste, un album..."
    />
    <button v-on:click="sendSearchQuery()" class="btn">
      <i class="fal fa-arrow-right"></i>
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      searchInputValue: "",
      minimumAcceptedScoreArtist: 99,
      minimumAcceptedScoreRecording: 80
    };
  },
  methods: {
    sendSearchQuery() {
      this.$emit("newQueryStarted");
      axios
        .get(
          "http://musicbrainz.org/ws/2/artist/?query=artist:" +
            this.searchInputValue +
            "&fmt=json"
        )
        .then(response => this.manageArtistData(response));
      axios
        .get(
          "http://musicbrainz.org/ws/2/recording/?query=recording:" +
            this.searchInputValue +
            "&fmt=json"
        )
        .then(response => this.manageRecordingData(response));
      axios
        .get(
          "http://musicbrainz.org/ws/2/recording/?query=artistname:" +
            this.searchInputValue +
            "&fmt=json"
        )
        .then(response => this.manageRecordingData(response));
    },
    manageArtistData(response) {
      // Récupère la réponse de l'API concernant les artistes et envoie les résultats pertinents à la home page
      const newQueryResults = [];
      for (const artist of response.data.artists) {
        if (
          artist.score > this.minimumAcceptedScoreArtist &&
          newQueryResults.length < 8
        ) {
          newQueryResults.push({
            name: artist.name,
            type: "artist",
            mbid: artist.id
          });
        }
      }
      if (newQueryResults.length > 0) {
        this.$emit("newQueryResultsReceived", newQueryResults);
      }
    },
    manageRecordingData(response) {
      // Récupère la réponse de l'API concernant les recording et envoie les résultats pertinents à la home page
      const newQueryResults = [];
      for (const recording of response.data.recordings) {
        if (
          recording.score > this.minimumAcceptedScoreRecording &&
          newQueryResults.length < 8
        ) {
          console.log(recording);
          if (recording.releases !== undefined) {
            newQueryResults.push({
              name: recording.title,
              type: "recording",
              mbid: recording.id,
              releaseid: recording.releases[0].id
            });
          } else {
            newQueryResults.push({
              name: recording.title,
              type: "recording",
              mbid: recording.id
            });
          }
        }
      }
      if (newQueryResults.length > 0) {
        this.$emit("newQueryResultsReceived", newQueryResults);
      }
    }
  }
};
</script>

<style lang="scss">
@import "../scss/_variables.scss";

.searchBarContainer {
  width: 100%;
  height: 70px;
  display: flex;
  margin: 0.5em; //En combinaison avec box-shadow
  transition: box-shadow 0.3s linear;
  box-shadow: 0px 0px 0px 0.1rem darkgray;
  border: 0;
  border-radius: 0.1rem;
}

.searchBarContainer:hover {
  box-shadow: 0px 0px 0px 0.2rem black;
}

input {
  width: 90%;
  height: 100%;
  font-size: 2rem;
  border: 0;
  border-radius: 0;
  background-color: $backgroundContentColor;
}

.btn {
  height: 100%;
  width: 10%;
  font-size: 1.8rem;
  border: 0;
  border-radius: 0;
  background-color: darkgray;
}
</style>
