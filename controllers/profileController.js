const UserRestricted = require('../models/userRestricted');

const findUserRestrictedByUserId = async (userId) => {
    try {
        return await UserRestricted.find({ userId });
    } catch (error) {
        throw new Error('Error al buscar perfiles: ' + error.message);
    }
};

module.exports = { findUserRestrictedByUserId };