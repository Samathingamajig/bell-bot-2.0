import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique("unique_block_date", ["year", "month", "day"])
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
