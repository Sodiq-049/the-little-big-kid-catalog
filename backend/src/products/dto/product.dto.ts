import { PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { AGE_GROUPS, BRANCHES, GENDERS } from '../product.schema';
import type { Branch } from '../product.schema';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  price!: string;

  @IsOptional()
  @IsString()
  wrappingPrice?: string;

  @IsString()
  @IsNotEmpty()
  img!: string;

  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsIn(BRANCHES)
  branch?: Branch;

  @IsOptional()
  @IsArray()
  @IsIn(AGE_GROUPS, { each: true })
  ageGroups?: string[];

  // An empty string clears the field when editing
  @IsOptional()
  @ValidateIf((_, v) => v !== '')
  @IsIn(GENDERS)
  gender?: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
