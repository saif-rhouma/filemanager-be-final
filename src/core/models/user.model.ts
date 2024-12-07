import { Column, CreateDateColumn, Entity, Generated, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { File } from './file.model';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  @Generated('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => File, (file) => file.createdBy)
  files: File[];

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
