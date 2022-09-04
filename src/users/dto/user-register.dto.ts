import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class UserRegisterDto {
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsString({ message: 'No password provided' })
  @Length(4, 20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsString({ message: 'No name provided' })
  name: string;
}
