import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: false
    }
);

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database Connected Successfully');
    } catch (error) {
        console.error('Error while connecting database', error);
        process.exit(1);
    }
}