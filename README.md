# music-brainz

> Utilisation de l'API MusicBrainz pour proposer de la recherche d'artistes/albums

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).


# Utilisation de l'API MusicBrainz

## URL d'une requête de recherche d'artistes

`http://musicbrainz.org/ws/2/artist/?query=artist:artistName&fmt=json`

## URL d'une requête de recherche d'albums à partir d'un artiste

`http://musicbrainz.org/ws/2/recording/?query=arid:ID%20AND%20primarytype:album&fmt=json`


## URL d'une requête de recherche de single à partir d'un artiste

`http://musicbrainz.org/ws/2/recording/?query=arid:ID%20AND%20primarytype:single&fmt=json`

Attention, l'API retourne tout les recording auxquels l'artiste a participé, on voudra sans doute filtrer cela, ou au moins laisser l'option à l'utilisateur.