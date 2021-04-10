# ElasticMovies

ElasticMovies is a pet project that started with the propouse to learn how to do an intelligent searcher with ElasticSearch.
It is developed using NextJs, TypeScript and ElasticSearch.

## Requirements

* Docker >=19.03 

## Getting Started

- Install dependencies ```npm install```.
- Run ```docker-compose up``` to up the ElasticSearch container.
- Run ```npm run sync-movies``` to populate the ElasticSearch DB with the movies. **This process takes 2 or 3 minutes to finish.**
- Run ```npm run dev``` to up the webapp and open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Synchronization improvements

The movies synchronization uses 1000 movies from a Json file (moviesSynchronizer/repositories/data/movies.json), for this amount of data takes 2 or 3 minutes to finish the process.
If the movies source were bigger, it would be necessary to improve the performance. Making the data indexing in bulk for example.
