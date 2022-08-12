import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import { TaskEntity } from '../task/task.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => TaskEntity, (TaskEntity) => TaskEntity.userId)
  tasks: TaskEntity[];
}
