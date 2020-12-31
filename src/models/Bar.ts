import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import Image from "./Image";

@Entity("bares")
export default class Bar {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  sobre: string;

  @Column()
  horario_de_funcionamento: string;

  @Column()
  aberto: boolean;

  @OneToMany(() => Image, (image) => image.bar, {
    cascade: ["insert", "update"],
  })
  @JoinColumn({ name: "bar_id" })
  images: Image[];
}
