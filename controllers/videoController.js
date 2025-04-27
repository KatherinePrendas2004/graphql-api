const Video = require('../models/videoModel');

const findAllVideos = async () => {
    try {
        return await Video.find();
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