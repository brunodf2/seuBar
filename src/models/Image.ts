import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Bar from "./Bar";

@Entity("images")
export default class Images {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => Bar, (bar) => bar.images)
  @JoinColumn({ name: "bar_id" })
  bar: Bar;
}
