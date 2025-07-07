import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity()
export class ServiceCatalog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

@Column()
 name: string;

  @Column('text')
  description: string;

  @Column()
  department: string;

  @Column()
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
