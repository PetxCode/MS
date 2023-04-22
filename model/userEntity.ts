import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import "reflect-metadata";

@Entity()
export class userEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  token: string;

  @Column({ default: false })
  verified: boolean;
}
