import {Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional} from "sequelize"

const statusOptions = DataTypes.ENUM("requested", "processing", "complete", "error")

export class Job extends Model<InferAttributes<Job>, InferCreationAttributes<Job>> {
    declare id: CreationOptional<string>
    declare status: CreationOptional<typeof statusOptions>
    declare url: string
    declare structure: CreationOptional<string>
    declare requested: CreationOptional<string>
    declare completed: CreationOptional<string>
}

export default function (sequelize: Sequelize) {
    Job.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            status: {
                type: statusOptions,
                allowNull: false,
                defaultValue: "requested"
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false
            },
            structure: {
                type: DataTypes.JSONB,
                allowNull: true
            },
            requested: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
            completed: {
                type: DataTypes.DATE,
                allowNull: true
            }
        },
        {
            tableName: "job",
            timestamps: false,
            underscored: true,
            indexes: [
                {
                    unique: false,
                    fields: ["status"]
                },
                {
                    unique: false,
                    fields: ["requested"]
                }
            ],
            sequelize
        }
    )
}
