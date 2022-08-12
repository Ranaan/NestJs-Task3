import { UserEntity } from '../user/user.entity';
import { StatusEntity } from '../status/status.entity';
import {
  Entity,
  Column,
  JoinColumn,
  OneToOne,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (UserEntity) => UserEntity.tasks)
  userId: number;

  @Column()
  title: string;

  @Column()
  @OneToOne(() => StatusEntity, (StatusEntity) => StatusEntity.id)
  @JoinColumn()
  statusId: number;
}
