import {
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';
import { SHOULD_BE_STRING } from 'src/common/constants/consts';
import { INVALID, ONE_OF_ENUM, REQUIRED_RANGE } from 'src/common/helpers';
import { ERoles } from 'src/types';

export class CreateStaffDto {
  @IsString({ message: SHOULD_BE_STRING })
  @Length(3, 50, { message: REQUIRED_RANGE(3, 50) })
  readonly username: string;

  @IsString({ message: SHOULD_BE_STRING })
  @Length(8, 50, { message: REQUIRED_RANGE(8, 50) })
  readonly password: string;

  @IsEnum(ERoles, { message: ONE_OF_ENUM(ERoles, 'Role') })
  readonly role: ERoles;

  @IsOptional()
  @IsString({ message: SHOULD_BE_STRING })
  @Length(3, 50, { message: REQUIRED_RANGE(3, 50) })
  readonly name?: string;

  @IsOptional()
  @IsString({ message: SHOULD_BE_STRING })
  @Length(3, 50, { message: REQUIRED_RANGE(3, 50) })
  readonly surname?: string;

  @IsOptional()
  @IsString({ message: SHOULD_BE_STRING })
  @IsEmail({}, { message: INVALID('email') })
  readonly email?: string;

  @IsOptional()
  @IsString({ message: SHOULD_BE_STRING })
  @IsPhoneNumber()
  readonly phone?: string;

  @IsOptional()
  @IsString({ message: SHOULD_BE_STRING })
  @IsDate()
  readonly date?: Date;
}
