const { gql } = require('apollo-server');

const typeDefs = gql`
    type UserRestricted {
        id: ID!
        nombreCompleto: String!
        pin: String!
        avatar: String!
        edad: Int
        userId: ID!
    }

    type Video {
        id: ID!
        nombre: String!
        url: String!
        descripcion: String
        playlistId: ID!
        userId: ID!
    }

    type Playlist {
        id: ID!
        nombre: String!
        userId: ID!
        perfilesAsociados: [UserRestricted]
        totalVideos: Int
    }

    type Query {
        profiles: [UserRestricted]
        videos(playlistId: ID): [Video]
        playlists(restrictedUserId: ID): [Playlist]
        searchVideos(query: String!): [Video]
    }
`;

module.exports = typeDefs;