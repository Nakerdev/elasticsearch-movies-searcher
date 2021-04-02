export {
    movieRepository,
    Movie
}

interface movieRepository {
    searchAll: () => Movie[]
    create: (movie: Movie) => void;
}

class Movie {

    readonly id: string;
    readonly title: string;
    readonly poster: string;
    readonly synopsis: string;
    readonly releaseDate: number;
    readonly genres: string[]

    constructor(
        id: string,
        title: string,
        poster: string,
        synopsis: string,
        releaseDate: number,
        genres: string[]
    ){
        this.id = id;
        this.title = title;
        this.poster = poster;
        this.synopsis = synopsis;
        this.releaseDate = releaseDate;
        this.genres = genres;
    }
}