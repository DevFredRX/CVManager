import { IsEmail, IsNotEmpty, IsString, Length, Matches, MinLength, NotContains } from "class-validator";

export class RegisterDTO {

    @IsString()
    @IsNotEmpty({ message: 'First name is required' })
    firstname!: string

    @IsString()
    @IsNotEmpty({ message: 'Last name is required' })
    lastname!: string

    @IsString()
    @IsNotEmpty({ message: 'Username is required' })
    @Length(3, 12, { message: 'Username must be between 3 and 12 characters' })
    @Matches(/^[a-zA-Z0-9_-]+$/, { message: 'Username can only contain letters, numbers, hyphens, or underscores' })
    @NotContains(' ')
    username!: string
    
    @IsEmail({}, { message: 'Please provide a valid email address' })
    @IsNotEmpty({ message: 'Email address is required' })
    @Matches(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, { message: 'Please enter a valid email address' })
    @NotContains(' ')
    email!: string
    
    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(12, { message: 'Password must be at least 12 characters long' })
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])(?!.*\s).{12,}$/, { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character' })
    @NotContains(' ')
    password!: string

}