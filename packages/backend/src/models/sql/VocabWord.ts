import { DataTypes, Model } from "sequelize"
import sequelize from "../../sqlDatabase"

class VocabWord extends Model {
  public id!: number
  public eng!: string
  public rus!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

VocabWord.init(
  {
    eng: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "VocabWord",
    timestamps: true,
  },
)

export default VocabWord
