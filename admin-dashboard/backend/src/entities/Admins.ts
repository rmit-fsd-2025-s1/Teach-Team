import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "admins" })
export class Admin {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;
}
