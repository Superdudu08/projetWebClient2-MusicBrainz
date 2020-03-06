<template>
    <div class="homePageContainer">
        <h1>El Discovator</h1>
        <h2>Recherchez vos artistes favoris, leurs albums et découvrez-en de nouveaux !</h2>
        <h4>Powered by MusicBrainz</h4>

        <SearchBar></SearchBar>

    </div>
</template>

<script>
import SearchBar from "./SearchBar";

export default {
    components: {
        SearchBar
    },
    data () {
        return {
        
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
</style>
