const Video = require('../models/videoModel');

const findAllVideos = async (userId) => {
    try {
        return await Video.find({ userId }); // Filtrar por userId
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