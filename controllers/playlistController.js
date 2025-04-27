const Video = require('../models/videoModel');

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

const findVideosByText = async (texto) => {
    try {
        return await Video.find({
            $or: [
                { nombre: { $regex: texto, $options: 'i' } },
                { descripcion: { $regex: texto, $options: 'i' } }
            ]
        });
    } catch (error) {
        throw new Error('Error al buscar videos por texto: ' + error.message);
    }
};

module.exports = { findAllVideos, findVideosByText };