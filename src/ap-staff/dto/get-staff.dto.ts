import { IsString, Length } from 'class-validator';
import { SHOULD_BE_STRING } from 'src/common/constants/consts';
import { REQUIRED_RANGE } from 'src/common/helpers';

export class GetStaffDto {
  @IsString({ message: SHOULD_BE_STRING })
  @Length(3, 50, { message: REQUIRED_RANGE(3, 50) })
  readonly username: string;

  @IsString({ message: SHOULD_BE_STRING })
  @Length(8, 50, { message: REQUIRED_RANGE(8, 50) })
  readonly password: string;
}
