import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ServiceRequest } from '../../requests/entities/service-request.entity';
import { userRole } from '../enums/user-role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: userRole, default: userRole.CITIZEN })
  role: userRole;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Inverse relation for requests created by the user (Citizen role)
  @OneToMany(() => ServiceRequest, request => request.citizen)
  requests: ServiceRequest[];

  // Inverse relation for requests assigned to the user (Officer role)
  @OneToMany(() => ServiceRequest, request => request.officer)
  assignedRequests: ServiceRequest[];
}
