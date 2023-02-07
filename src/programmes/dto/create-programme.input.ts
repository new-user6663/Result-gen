import { InputType, Int, Field, registerEnumType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

export enum Mode {
  STAGE = 'STAGE',
  NON_STAGE = 'NON_STAGE',
  OUTDOOR_STAGE = 'OUTDOOR_STAGE'
}

export enum Type {
  SINGLE = 'SINGLE',
  GROUP = 'GROUP',
  HOUSE = 'HOUSE'
}


registerEnumType(Mode, {
  name: 'Mode',
});

registerEnumType(Type, {
  name: 'Type',
});


@InputType()
export class CreateProgrammeInput {

  @IsNotEmpty()
  @Field()
  programCode: string;

  @IsNotEmpty()
  @Field()
  name: string;

  @IsNotEmpty()
  @Field(()=> Mode)
  mode: Mode;

  @IsNotEmpty()
  @Field(()=> Type)
  type: Type;

  @IsNumber()
  @Field(()=> Int)
  groupCandidatesCount: number;

  @IsNotEmpty()
  @IsNumber()
  @Field(()=> Int )
  candidateCount: number;

  @IsNotEmpty()
  @Field()
  date: string;

  @IsNotEmpty()
  @Field()
  time: string;

  @IsNotEmpty()
  @IsNumber()
  @Field(()=> Int )
  venue: number;

  @IsNotEmpty()
  @IsNumber()
  @Field(()=> Int)
  duration: number;

  @IsNotEmpty()
  @Field()
  conceptNote: string;

  @IsNotEmpty()
  @Field()
  @Field(()=> Int)
  skill_id: number;

  @IsNotEmpty()
  @IsNumber()
  @Field(()=> Int)
  category_id : number;

  @IsNotEmpty()
  @IsNumber()
  @Field(()=> Int)
  section_id: number;


}