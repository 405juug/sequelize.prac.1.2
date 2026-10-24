const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Profile = sequelize.define('Profile', {
    bio: { type: DataTypes.TEXT },
    avatarUrl: { type: DataTypes.STRING },
    birthDate: { type: DataTypes.DATEONLY },
}, {
    tableName: 'profiles',
});

module.exports = Profile;