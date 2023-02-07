import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { CandidateProgramme } from 'src/candidate-programme/entities/candidate-programme.entity';
import { Category } from 'src/category/entities/category.entity';
import { Section } from 'src/sections/entities/section.entity';
import { Team } from 'src/teams/entities/team.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Photo } from '../../utils/photo.interface';

export enum Gender {
  MALE = 'M',
  FEMALE = 'F',
  OTHER = 'O'
}

registerEnumType(Gender, {
  name: 'Gender',
});

@Entity()
@ObjectType()
export class Candidate {

  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({nullable:true})
  @Field(()=> Int,{nullable:true})
  class: number;

  @Column({nullable:true})
  @Field({nullable:true})
  adno: number;

  @Column({nullable:true})
  @Field({nullable:true})
  dob: string;

  @Column({nullable:true , unique: true})
  @Field(()=> Int ,{nullable:true})
  chestNO: number;

  @OneToMany(() => CandidateProgramme, (candidateProgramme) => candidateProgramme.candidate)
  @Field(() => [CandidateProgramme], { nullable: true })
  candidateProgrammes: CandidateProgramme[];

  // @Column({ nullable: true, type: 'json' })
  // @Field(() => Photo ,{nullable:true})
  // photo: Photo;

  @Column({ type: 'varchar', default: Gender.MALE })
  @Field(()=> Gender)
  gender: Gender;

  @ManyToOne(()=> Team , (team) => team.candidates)
  @Field(()=> Team , {nullable:true})
  team:Team;

  @ManyToOne(()=> Section , (section) => section.candidates)
  @Field(()=> Section , {nullable:true})
  section:Section;

  @ManyToOne(()=> Category , (category) => category.candidates)
  @Field(()=> Category , {nullable:true})
  category:Category;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

}