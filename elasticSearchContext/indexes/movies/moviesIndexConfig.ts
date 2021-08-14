export default {
  name: "movies",
  configuration: {
    settings: {
      analysis: {
        analyzer: {
          movies_title_analyzer: {
            type: "custom",
            tokenizer: "standard",
            filter: ["lowercase", "stop", "stemmer", "asciifolding"],
          },
        },
      },
    },
    mappings: {
      dynamic: "strict",
      properties: {
        id: { type: "keyword" },
        title: {
          type: "text",
          analyzer: "movies_title_analyzer",
        },
        poster: { type: "text" },
        synopsis: { type: "text" },
        release_date: { type: "long" },
        genres: { type: "keyword" },
      },
    },
  },
};
