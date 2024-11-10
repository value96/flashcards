import { CreationOptional, DataTypes, Model } from 'sequelize'
import sequelize from '../../sqlDatabase'

export class VocabWord extends Model {
  public id!: number
  public eng!: string
  public rus!: string
  public readonly createdAt!: CreationOptional<Date>
  public readonly updatedAt!: CreationOptional<Date>
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
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'VocabWord',
    timestamps: true,
  },
)
