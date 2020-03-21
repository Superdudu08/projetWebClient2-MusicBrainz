<template>
  <div class="queryResultContainer" @click="onClick">
    <img :src="this.imageURL" alt="Photo Artiste" class="queryResultImage" @error="getDefaultPicture" />
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
      if (this.result.type == "artist") {
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
        // On essaie d'abord d'afficher l'image de type FRONT, si cela échoue, on récupère l'image par défaut liée au titre, et si cela échoue encore, on affiche une image par défaut.
        axios.get("http://coverartarchive.org/release/"+ this.result.releaseid +"/front")
        .then( response => {
          console.log(response);
          this.imageURL = "http://coverartarchive.org/release/"+ this.result.releaseid +"/front";
        })
        .catch(
          axios.get("http://coverartarchive.org/release/"+ this.result.releaseid)
          .then(this.imageURL = "http://coverartarchive.org/release/"+ this.result.releaseid)
          .catch(this.getDefaultPicture())        
        );        
    },
    getDefaultPicture() {
      // Utilisation de l'image par défaut
      this.imageURL = "src/assets/defaultIconQueryResult.jpeg";
    },
    onClick() {
      // Evènement lancé quand l'utilisateur clique sur un queryResult
      console.log(this.result);
      if(this.result.type==="artist"){
        this.onClickArtist();
      }
      if(this.result.type==="recording"){
        this.onClickRecording();
      }
    },
    onClickArtist() {
      // Gestion du clic quand la QueryResult est un artiste
    }
  },
  mounted: function() {
      this.getPicture();
  }
};
</script>

<style lang="scss">
@import '../scss/_variables.scss';

.queryResultContainer {
  display: flex;
  width: 100%;
  box-shadow: 0px 0px 0px 0.1rem darkgray;
  border-radius:9px;
  margin: 0.5em; //En combinaison avec box-shadow
  margin-top: 8px;
  transition: box-shadow 0.3s linear;
  background-color:whitesmoke;
  height:220px;
  padding:4px;
}

.queryResultContainer:hover {
  cursor:pointer;
  box-shadow: 0px 0px 0px 0.2rem $baseColor;
}

.queryResultImage {
  height: 180px;
  width: 180px;
  border-radius: 50%;
}
</style>
