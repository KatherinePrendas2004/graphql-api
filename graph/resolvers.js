const { findUserRestrictedByUserId } = require('../controllers/profileController');
const { findAllVideos, findVideosByText } = require('../controllers/videoController');
const { findPlaylistsByUserId } = require('../controllers/playlistController');

const resolvers = {
    Query: {
        profiles: async (_, __, { userId }) => {
            if (!userId) throw new Error('Autenticación requerida');
            return await findUserRestrictedByUserId(userId);
        },
        videos: async (_, __, { userId }) => {
            if (!userId) throw new Error('Autenticación requerida');
            return await findAllVideos();
        },
        playlists: async (_, __, { userId }) => {
            if (!userId) throw new Error('Autenticación requerida');
            return await findPlaylistsByUserId(userId);
        },
        searchVideos: async (_, { query }, { userId }) => {
            if (!userId) throw new Error('Autenticación requerida');
            return await findVideosByText(query);
        }
    },
    Video: {
        playlistId: async (video) => video.playlistId
    },
    Playlist: {
        perfilesAsociados: async (playlist) => {
            return playlist.perfilesAsociados.map(id => ({ id, nombreCompleto: '', pin: '', avatar: '', edad: 0, userId: '' })); // Placeholder, implementa la carga real
        }
    }
};

module.exports = resolvers;