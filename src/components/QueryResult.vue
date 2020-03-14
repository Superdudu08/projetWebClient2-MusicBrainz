<template>
  <div class="queryResultContainer">
    <img :src="this.imageURL" alt="Photo Artiste" class="queryResultImage" />
    <div class="queryDetailsContainer">
      <h3>{{this.result.name}}</h3>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["result"],
  data() {
    return {
      imageURL: "src/assets/defaultIconQueryResult.jpeg"
    };
  },
  methods: {
    getPicture() {
        // Récupère un thumbnail pour le queryResult
      if (this.result.type === "artist") {
        this.getArtistPicture();
      }
      else {
        this.getRecordPicture();
      }
    },
    getArtistPicture() {
        // Récupère un thumbnail pour notre queryResult de type artiste avec l'API TheAudioDB
      axios.get("https://theaudiodb.com/api/v1/json/1/search.php?s=" + this.result.name)
        .then(response => {
            this.imageURL = response.data.artists[0].strArtistThumb;
        });
    },
    getRecordPicture() {
        // Récupère un thumbnail pour notre queryResult de type album/single avec l'API CovertArtArchive
        console.log("On récupère un thumbnail record")
        axios.get("http://musicbrainz.org/ws/2/release/?query=release:" + this.result.name + "&fmt=json")
        .then(response => {
            let releaseID = response.data.releases[0].id;
            this.imageURL = "http://coverartarchive.org/release/"+ releaseID +"/front";
        })
    }
  },
  mounted: function() {
      this.getPicture();
  }
};
</script>

<style lang="scss">
.queryResultContainer {
  display: flex;
  width: 100%;
}

.queryResultImage {
  height: 200px;
  width: 200px;
  border-radius: 50%;
}
</style>
