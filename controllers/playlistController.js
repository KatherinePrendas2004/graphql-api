const Playlist = require('../models/playlistModel');

const findPlaylistsByUserId = async (userId) => {
    try {
        return await Playlist.find({ userId });
    } catch (error) {
        throw new Error('Error al buscar playlists: ' + error.message);
    }
};

module.exports = { findPlaylistsByUserId };