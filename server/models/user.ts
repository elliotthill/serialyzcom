"use strict"

import {Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional} from "sequelize"

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>
    declare password: string
    declare email: string
    declare registered: CreationOptional<string>

    format() {
        return [this.id, this.email].join(",")
    }
}

export default function (sequelize: Sequelize) {
    User.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            registered: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            }
        },
        {
            tableName: "users",
            timestamps: false,
            underscored: true,
            sequelize
        }
    )
}
