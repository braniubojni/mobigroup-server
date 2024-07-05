import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { ERoles } from 'src/types';

interface APStaffCreationAttrs {
  username: string;
  password: string;
  role: ERoles;
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  date?: Date;
}

@Table({ tableName: 'AP_staff', timestamps: false })
@Table({
  tableName: 'AP_staff',
  timestamps: false,
})
export class APStaff extends Model<APStaff, APStaffCreationAttrs> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  username: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM(
      'admin',
      'manager',
      'datamanager',
      'executive',
      'viewer',
      'limited',
    ),
    allowNull: false,
  })
  role: ERoles;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  name: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  surname: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  email: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  phone: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  date: Date;
}
