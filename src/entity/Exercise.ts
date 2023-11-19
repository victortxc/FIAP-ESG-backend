import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

enum Category {
  caminhar = "caminhar",
  correr = "correr",
  pedalar = "pedalar",
}

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "enum", enum: Category })
  category: string;
  @Column()
  km: number;
  @Column({ default: null, nullable: true })
  points: number;
  @Column()
  date: Date;
  @CreateDateColumn()
  create_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @ManyToOne(() => User, (user) => user.exercises)
  @JoinColumn({ name: "user_id" })
  user: User;

  @BeforeInsert()
  calculatePointsOnInsert(): void {
    if (this.category == "caminhar") {
      this.points = this.km * 1;
    } else if (this.category == "correr") {
      this.points = this.km * 2;
    } else if (this.category == "pedalar") {
      this.points = this.km * 3;
    }
  }
}
