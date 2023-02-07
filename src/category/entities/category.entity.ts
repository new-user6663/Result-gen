import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Candidate } from 'src/candidates/entities/candidate.entity';
import { Programme } from 'src/programmes/entities/programme.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Category {
  @Field(() => Int, { description: '' })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true})
  @Field()
  name: string;

  @OneToMany(() => Candidate, (Candidate) => Candidate.category)
  @Field(()=> [Candidate] , {nullable:true})
  candidates: Candidate[];

  @OneToMany(() => Programme, (programme) => programme.category)
  @Field(() => [Programme], { nullable: true })
  programmes: Programme[];

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

}
