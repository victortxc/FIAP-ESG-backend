import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Exercise } from "./Exercise";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  password: string;
  @Column({ unique: true })
  email: string;
  @Column({
    default: false,
  })
  isAdmin: boolean;
  @CreateDateColumn()
  create_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @OneToMany(() => Exercise, (exercise) => exercise.user)
  exercises: Exercise[];
}
