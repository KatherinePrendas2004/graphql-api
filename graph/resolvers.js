const { findUserRestrictedByUserId } = require('../controllers/profileController');
const { findAllVideos, findVideosByText } = require('../controllers/videoController');
const { findPlaylistsByUserId } = require('../controllers/playlistController');
const Playlist = require('../models/playlistModel');

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
        playlists: async (_, { restrictedUserId }, { user }) => {
            if (!user || !user.userId) {
                console.log('Contexto:', user); // Depuración
                throw new Error('Autenticación fallida o userId no proporcionado.');
            }
            let query = { userId: user.userId };
            if (restrictedUserId) {
                query.perfilesAsociados = restrictedUserId;
            }
            try {
                return await Playlist.find(query).populate('perfilesAsociados');
            } catch (error) {
                throw new Error('Error al buscar playlists: ' + error.message);
            }
        },
        searchVideos: async (_, { query }, { user }) => {
            if (!user || !user.userId) {
                console.log('Contexto:', user); // Depuración
                throw new Error('Autenticación fallida o userId no proporcionado.');
            }
            return await findVideosByText(query, user.userId);
        }
    },
    Playlist: {
        perfilesAsociados: async (playlist) => {
            return playlist.perfilesAsociados;
        }
    }
};

module.exports = resolvers;