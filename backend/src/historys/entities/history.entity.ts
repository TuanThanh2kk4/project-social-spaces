import { RoleType } from 'src/helper/helper.enum';
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class History {
  @PrimaryGeneratedColumn('uuid')
  history_id: string;

  @Column()
  target_id: string;

  @Column()
  createdAt: Date;

  @Column({ default: null })
  updatedAt: Date;

  @Column({ default: null })
  deletedAt: Date;

  @Column()
  createdBy: string;

  @Column({ default: null })
  updatedBy: string;

  @Column({ default: null })
  deletedBy: string;

  @Column()
  role: RoleType;
}
