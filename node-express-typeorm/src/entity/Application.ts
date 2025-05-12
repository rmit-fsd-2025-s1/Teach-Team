import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from 'typeorm';

export type Availability = "part-time" | "full-time";

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

  @Column({
    type: "enum",
    enum: ["part-time", "full-time"],
  })
  availability: Availability;

  @Column()
  skills: string;

  @Column()
  academicCredentials: string;

  @CreateDateColumn()
  dateApplied: Date;

  @Column({ default: false })
  isSelected: boolean;

  @Column({ type: "text", nullable: true })
  comments?: string;

  @Column({ nullable: true })
  rank?: number;
}