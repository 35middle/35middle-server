import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  @UpdateDateColumn()
  createAt: Date;

  @Column()
  @UpdateDateColumn()
  updateAt: Date;

  @BeforeInsert()
  eamilToLowerCase() {
    this.email = this.email.toLowerCase();
  }
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
