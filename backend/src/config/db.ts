import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
  }
);

console.log(process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD,)

export default sequelize;
