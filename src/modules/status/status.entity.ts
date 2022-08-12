import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskEntity } from '../task/task.entity';

@Entity()
export class StatusEntity {
  @PrimaryGeneratedColumn()
  @OneToOne(() => TaskEntity, (TaskEntity) => TaskEntity.statusId)
  id: number;

  @Column({ default: 'pending', nullable: false, type: 'varchar', length: 50 })
  title: string;
}
