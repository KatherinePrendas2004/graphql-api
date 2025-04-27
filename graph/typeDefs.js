const { gql } = require('apollo-server');

const typeDefs = gql`
    type UserRestricted {
        id: ID!
        nombreCompleto: String!
        pin: String!
        avatar: String
        edad: Int!
        userId: ID!
    }

    type Video {
        id: ID!
        nombre: String!
        url: String!
        descripcion: String
        playlist: Playlist
    }

    type Playlist {
        id: ID!
        nombre: String!
        userId: ID!
        perfilesAsociados: [ID]
    }

    type Query {
        profiles: [UserRestricted]
        videos: [Video]
        playlists: [Playlist]
        searchVideos(texto: String!): [Video]
    }
`;

module.exports = typeDefs;