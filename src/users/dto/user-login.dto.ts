import { IsString, Length, Matches } from 'class-validator';
export class UserLoginDto {
  @IsString()
  name: string;
  @IsString()
  @Length(4, 20)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password too weak',
  // })
  password: string;
}
