<template>
    <div class="homePageContainer">
        <h1>El Discovator</h1>
        <h2>Recherchez vos artistes favoris, leurs albums et découvrez-en de nouveaux !</h2>
        <h4>Powered by MusicBrainz</h4>

        <SearchBar></SearchBar>

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
                },
                {
                    type:"album",
                    name:"No need to Argue"
                }
            ]
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
