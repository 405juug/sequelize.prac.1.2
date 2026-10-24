const sequelize = require('./db');
const { User, Profile } = require('./models');

async function main() {
    try{
        await sequelize.authenticate();
        console.log('Соединение с базой данных установлено');

        await sequelize.sync({ force: true });
        console.log('Таблицы синхронизированы');

        const ivan = await User.create({ name: 'Иван Петров', email: 'ivanpetrov@example.com' });
        const anna = await User.create({ name: 'Анна Смирнова', email: 'annasmirnova@example.com' });

        await ivan.createProfile({
            bio: 'Backend-разработчик',
            avatarUrl: 'https://example.com/avatars/ivan.png',
            birthDate: '1999-04-12',
        });
        await anna.createProfile({
            bio: 'Дизайнер интерфейсов',
            avatarUrl: 'https://example.com/avatars/anna.png',
            birthDate: '1996-09-30',
        });

        const ivanProfile = await ivan.getProfile();
        console.log('\nПрофиль Ивана через getProfile():');
        console.log(ivanProfile.toJSON());

        const users = await User.findAll({
            include: { model: Profile, as: 'profile' },
        });
        console.log('\nПользователи с профилями (include):');
        console.log(JSON.stringify(users.map((u) => u.toJSON()), null, 2));

        const profiles = await Profile.findAll({
            include: { model: User, as: 'user' },
        });
        console.log('\nПрофили с пользователями (include):');
        console.log(JSON.stringify(profiles.map((p) => p.toJSON()), null, 2));
    } catch (error) {
        console.error('Ошибка:', error);
    } finally {
        await sequelize.close();
    }
}

main();