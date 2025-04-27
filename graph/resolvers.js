const { findUserRestrictedByUserId } = require('../controllers/profileController');
const { findAllVideos, findVideosByText } = require('../controllers/videoController');
const { findPlaylistsByUserId } = require('../controllers/playlistController');

const resolvers = {
    Query: {
        profiles: async (_, __, context) => {
            if (!context.user || !context.user.userId) {
                console.log('Contexto:', context.user); // Depuración
                throw new Error('Autenticación fallida o userId no proporcionado.');
            }
            return await findUserRestrictedByUserId(context.user.userId);
        },
        videos: async (_, { playlistId }, { user }) => {
            if (!user || !user.userId) {
                console.log('Contexto:', user); // Depuración
                throw new Error('Autenticación fallida o userId no proporcionado.');
            }
            return await findAllVideos(user.userId, playlistId);
        },
        playlists: async (_, __, { user }) => {
            if (!user || !user.userId) {
                console.log('Contexto:', user); // Depuración
                throw new Error('Autenticación fallida o userId no proporcionado.');
            }
            return await findPlaylistsByUserId(user.userId);
        },
        searchVideos: async (_, { query }, { user }) => {
            if (!user || !user.userId) {
                console.log('Contexto:', user); // Depuración
                throw new Error('Autenticación fallida o userId no proporcionado.');
            }
            return await findVideosByText(query);
        }
    },
    Playlist: {
        perfilesAsociados: async (playlist) => {
            return playlist.perfilesAsociados;
        }
    }
};

module.exports = resolvers;