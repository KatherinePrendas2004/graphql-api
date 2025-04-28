const Video = require('../models/videoModel');
const Playlist = require('../models/playlistModel');

const findAllVideos = async (userId, playlistId) => {
    try {
        const query = { userId };
        if (playlistId) {
            query.playlistId = playlistId;
        }
        return await Video.find(query);
    } catch (error) {
        throw new Error('Error al buscar videos: ' + error.message);
    }
};

const findVideosByText = async (texto, userId, restrictedUserId) => {
    try {
        let query = {
            $or: [
                { nombre: { $regex: texto, $options: 'i' } },
                { descripcion: { $regex: texto, $options: 'i' } }
            ]
        };
        if (userId) {
            query.userId = userId;
        }
        if (restrictedUserId) {
            const playlists = await Playlist.find({ perfilesAsociados: restrictedUserId });
            const playlistIds = playlists.map(p => p._id);
            query.playlistId = { $in: playlistIds };
        }
        return await Video.find(query);
    } catch (error) {
        throw new Error('Error al buscar videos por texto: ' + error.message);
    }
};

module.exports = { findAllVideos, findVideosByText };