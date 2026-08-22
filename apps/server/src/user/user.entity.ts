import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: 'varchar' })
    firstname!: string

    @Column({ type: 'varchar' })
    lastname!: string

    @Column({ type: 'varchar', unique: true })
    username!: string

    @Column({ type: 'varchar', unique: true })
    email!: string

    @Column()
    @Exclude()
    hashedPassword!: string

    @Column({ default: false })
    isActive!: boolean

    @Column({ type: 'int', nullable: true })
    @Exclude()
    activationCode!: number | null

    @Column({ default: false })
    isTwoFactorEnabled!: boolean

    @Column({ type: 'varchar', nullable: true })
    twoFactorSecret!: string | null

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
     
}