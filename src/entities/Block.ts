import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Block extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public _id: string;

  @Column()
  public year: number;

  @Column()
  public month: number;

  @Column()
  public day: number;

  @Column()
  public block: string;
}
