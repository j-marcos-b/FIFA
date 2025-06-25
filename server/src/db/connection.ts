import { Sequelize } from "sequelize";

const sequelize = new Sequelize('fifa_players_db', 'root', '11114444', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

export default sequelize;