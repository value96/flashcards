import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Association,
  NonAttribute,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
} from "sequelize"
import sequelize from "../../sqlDatabase"
import RefreshSession from "./RefreshSession"

class User extends Model<
  InferAttributes<User /* , { omit: "refreshSessions" } */>,
  InferCreationAttributes<User /* , { omit: "refreshSessions" } */>
> {
  declare id: string
  declare email: string
  declare username: string
  declare passwordHash: string

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  declare getRefreshSessions: HasManyGetAssociationsMixin<RefreshSession>
  declare addRefreshSession: HasManyAddAssociationMixin<RefreshSession, number>
  declare addRefreshSessions: HasManyAddAssociationsMixin<
    RefreshSession,
    number
  >
  declare setRefreshSessions: HasManySetAssociationsMixin<
    RefreshSession,
    number
  >
  declare removeRefreshSession: HasManyRemoveAssociationMixin<
    RefreshSession,
    number
  >
  declare removeRefreshSessions: HasManyRemoveAssociationsMixin<
    RefreshSession,
    number
  >
  declare hasRefreshSession: HasManyHasAssociationMixin<RefreshSession, number>
  declare hasRefreshSessions: HasManyHasAssociationsMixin<
    RefreshSession,
    number
  >
  declare countRefreshSessions: HasManyCountAssociationsMixin
  declare createRefreshSession: HasManyCreateAssociationMixin<
    RefreshSession,
    "userId"
  >

  declare refreshSessions?: NonAttribute<RefreshSession[]>

  declare static associations: {
    refreshSessions: Association<User, RefreshSession>
  }
}

User.init(
  {
    id: {
      type: DataTypes.STRING(36),
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },

    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },

    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "Users",
  },
)

User.hasMany(RefreshSession, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "refreshSessions",
})

export default User
