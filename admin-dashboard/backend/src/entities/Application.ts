import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Application {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  selectedCourse: string;

  @Column()
  role: string;

  @Column()
  previousRoles: string;

  @Column()
  availability: string;

  @Column()
  skills: string;

  @Column()
  academicCredentials: string;

  @Column({ default: false })
  isUnavailable: boolean;
} 