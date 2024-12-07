import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { File } from './file.model';

@Entity({ name: 'tags' })
export class Tag {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  @Generated('uuid')
  id: string;

  @Column({ unique: true })
  text: string;

  @ManyToMany(() => File, (file) => file.tags)
  @JoinTable()
  files: File[];

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
