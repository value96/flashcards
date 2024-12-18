/* import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from "sequelize"
import sequelize from "../../sqlDatabase"
import { User } from "./User"

export class RefreshSession extends Model<
  InferAttributes<RefreshSession>,
  InferCreationAttributes<RefreshSession>
> {
  declare id: CreationOptional<string>
  declare userId: ForeignKey<User["id"]>

  declare fingerprint: string

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  declare expiresAt: Date
}

RefreshSession.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fingerprint: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "RefreshSessions",
  },
)

 */
