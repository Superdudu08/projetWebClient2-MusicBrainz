<template>
    <div class="homePageContainer">
        <h1>El Discovator</h1>
        <h2>Recherchez vos artistes favoris, leurs albums et découvrez-en de nouveaux !</h2>
        <h4>Powered by MusicBrainz</h4>

        <SearchBar @newQueryResultsReceived='onNewQueryResultsReceived' @newQueryStarted='onNewQueryStarted'></SearchBar>

        <div class="queryResultsContainer">
            <QueryResult v-for="result in queryResults" :result='result' v-bind:key="result.id"></QueryResult>
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
    data () {
        return {
            queryResults: [
                {
                    type:"artist",
                    name:"Linkin Park"
                },
                {
                    type:"artist",
                    name:"Francis Cabrel"
                }
            ]
        }
    },
    methods: {
        onNewQueryResultsReceived(queryResultArray) {
            // On recoit un tableau de Query Result de la part de la search bar, on veut les ajouter à la home
            for (const queryResult of queryResultArray){
                this.queryResults.push(queryResult)
            }
        },
        onNewQueryStarted() {
            // L'utilisateur vient de lancer une nouvelle requête, on nettoie donc l'affichage
            this.queryResults = [];
        }
    }
}
</script>

<style lang="scss">
.homePageContainer {
    display:flex;
    flex-direction: column;
    align-items: center;
}

.queryResultsContainer {
    display:flex;
    flex-direction: column;
    width:80%;
}
</style>
