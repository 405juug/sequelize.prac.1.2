const User = require('./User');
const Profile = require('./Profile');

User.hasOne(Profile, { foreignKey: 'userId', as: 'profile' });
Profile.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = { User, Profile };