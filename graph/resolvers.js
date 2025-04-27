const { findUserRestrictedByUserId } = require('../controllers/profileController');
const { findAllVideos, findVideosByText } = require('../controllers/videoController');
const { findPlaylistsByUserId } = require('../controllers/playlistController');

const resolvers = {
    Query: {
        profiles: async (_, __, context) => {
            if (!context.user || !context.user.userId) {
                throw new Error('Autenticación fallida o userId no proporcionado.');
            }
            return await findUserRestrictedByUserId(context.user.userId);
        },
        videos: async () => {
            return await findAllVideos();
        },
        playlists: async (_, __, { user }) => {
            if (!user || !user.userId) {
                throw new Error('Autenticación fallida o userId no proporcionado.');
            }
            return await findPlaylistsByUserId(user.userId);
        },
        searchVideos: async (_, { texto }) => {
            return await findVideosByText(texto);
        }
    }
};

module.exports = resolvers;