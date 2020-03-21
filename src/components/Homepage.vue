<template>
  <div class="homePageContainer">
    <div class="homePageHeader">
      <h1 class="title">El Discovator</h1>
      <h3>Recherchez vos artistes favoris, leurs albums et découvrez-en de nouveaux !</h3>
      <h4>Powered by MusicBrainz</h4>
      <div class="searchBar">
        <SearchBar
        @newQueryResultsReceived="onNewQueryResultsReceived"
        @newQueryStarted="onNewQueryStarted"></SearchBar>
      </div>
    </div>

    

    <div class="queryResultsContainer">
        <div class="queryResult" v-for="result in queryResults" v-bind:key="result.id">
             <QueryResult  :result="result" ></QueryResult>
        </div>
     
    </div>
  </div>
</template>

<script>
import SearchBar from "./SearchBar";
import QueryResult from "./QueryResult";

export default {
  components: {
    SearchBar,
    QueryResult
  },
  data() {
    return {
      queryResults: [
        {
          type: "artist",
          name: "Linkin Park"
        },
        {
          type: "artist",
          name: "Francis Cabrel"
        }
      ]
    };
  },
  methods: {
    onNewQueryResultsReceived(queryResultArray) {
      // On recoit un tableau de Query Result de la part de la search bar, on veut les ajouter à la home
      for (const queryResult of queryResultArray) {
        this.queryResults.push(queryResult);
      }
    },
    onNewQueryStarted() {
      // L'utilisateur vient de lancer une nouvelle requête, on nettoie donc l'affichage
      this.queryResults = [];
    }
  }
};
</script>

<style lang="scss">

@import '../scss/_variables.scss';

.homePageContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.queryResultsContainer {
  display: flex;
  flex-direction: row;
  width: 95%;
  flex-wrap:wrap;
  justify-content: space-around;
}

.queryResult {
    width:32%;
    margin-right:0.5%;
    box-sizing: border-box;
}
.searchBar {
    width:50%;
}
.title {
    font-weight: 600;
    font-size:2.7rem;
}

.homePageHeader {
    background-color: $baseColor;
    width:100%;
    text-align:start;
    color:$lightTextColor;
    padding-left:20px;
    padding-bottom:10px;
    padding-top:10px;
}
</style>
