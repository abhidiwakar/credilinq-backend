import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsMobilePhone,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateEntryDTO {
  @IsString({ message: 'Company UEN must be a string' })
  @Matches(/^[0-9]{8}[A-Z]$/, {
    message: 'Company UEN must be a valid UEN',
  })
  company_uen: string;

  @IsString({ message: 'Company name must be a string' })
  @MinLength(2, { message: 'Company name must be at least 2 characters long' })
  company_name: string;

  @IsString({ message: 'Person name must be a string' })
  @MinLength(2, { message: 'Person name must be at least 2 characters long' })
  person_name: string;

  @IsString({ message: 'Position in company must be a string' })
  @MinLength(2, {
    message: 'Position in company must be at least 2 characters long',
  })
  position_in_company: string;

  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @IsString({ message: 'Phone number must be a string' })
  @IsMobilePhone(
    'en-SG',
    {},
    {
      message: 'Phone number must be a valid singaporean phone number',
    },
  )
  phone_number: string;

  @IsArray({ message: 'Files must be an array of strings' })
  @ArrayMinSize(6, { message: 'Files must have at least 6 files' })
  @ArrayMaxSize(6, { message: 'Files must have at most 6 files' })
  @IsString({ each: true, message: 'Each file must be a string' })
  files: string[];
}
