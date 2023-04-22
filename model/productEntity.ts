import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import "reflect-metadata";

@Entity()
export class productEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  price: number;
}
