import { CreationOptional } from "sequelize"

export type RequiredCreationAttributes<T> = Omit<
  T,
  {
    [K in keyof T]: T[K] extends CreationOptional<any> ? K : never
  }[keyof T]
>
