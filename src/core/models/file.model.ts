import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.model';
import { Tag } from './tag.model';

export enum FileType {
  Video = 'Video',
  Image = 'Image',
  Unknown = 'Unknown',
}

@Entity({ name: 'files' })
export class File {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  @Generated('uuid')
  id: string;

  @Column({
    nullable: false,
    unique: true,
  })
  filename: string;

  @Column({
    nullable: false,
  })
  fileOriginalName: string;

  @Column()
  size: number;

  @Column({
    nullable: true,
    default: 0,
  })
  viewNumber: number;

  @Column('varchar', { default: FileType.Image })
  type: string;

  @Column({
    nullable: true,
    default: false,
  })
  isShared: boolean;

  @ManyToOne(() => User, (user) => user.files)
  createdBy: User;

  @ManyToMany(() => Tag, (tag) => tag.files, { cascade: true })
  tags: Tag[];

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
