import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

//Marca que essa class é uma entidade
@Entity()
export class Usuario {
  //Coluna id gerada automaticamente
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  idade!: number;

  @Column()
  cpf!: string;

  @Column()
  senha!: string;

  @CreateDateColumn({ name: "criado_em" })
  criadoEm!: Date;
}
