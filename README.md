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


## Récupération des couvertures des recordings

`http://coverartarchive.org/release/{mbid}/front`

Si on mange un 404, cela peut signifier que la communauté ne s'est pas mise d'accord sur une image "front" acceptable, auquel cas on tentera de récupérer une image à l'aide de l'URL suivante :

`http://covertartarchive.org/release/{mbid}`

On peut utiliser -250 -500 pour obtenir une certaine taille d'image - à approfondir !

De plus, il faut un ID de release et non de recording, attention ! 

## Récupération des photos pour les artistes

Etant donné que l'API ne propose pas de photos pour les artistes, on utilisera une API différente pour cette tâche : TheAudioDB.
On peut récupérer un thumbnail ou un logo, il faudra voir lequel est le plus pertinent.

`https://theaudiodb.com/api/v1/json/1/search.php?s={artistName}`

Et dans la réponse on a les attributs : strArtistLogo - strArtistThumb