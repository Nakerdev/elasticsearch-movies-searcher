# ElasticMovies

ElasticMovie is a pet project that started with the propouse to learn how to do an intelligent searcher wit ElasticSearch.
It is developed using NextJs, TypeScript, ElasticSearch and a JSON as movies source.

## Requirements

* Docker >=19.03 

## Getting Started

- Install dependencies ```npm install```.
- Run ```docker-compose up``` to up the ElasticSearch container.
- Run ```npm run populate-db``` or ```yarn populate-db``` to populate the ElasticSearch DB with the movies.
- Run ```npm run dev``` or ```yarn dev``` to up the webapp and open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

