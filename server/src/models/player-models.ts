import { DataTypes } from "sequelize";
import db from "../db/connection";

const Player = db.define('Player', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    long_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    player_face_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    club_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    nationality_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    player_positions: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fifa_version: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    overall: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    height_cm: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    weight_kg: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    preferred_foot: {
        type: DataTypes.STRING,
        allowNull: true
    },
    pace: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    shooting: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    passing: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    dribbling: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    defending: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    physic: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    attacking_finishing: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    skill_ball_control: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    movement_reactions: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    power_shot_power: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'players',
    timestamps: false //No se crearán createdAt y updatedAt
});

export default Player;
