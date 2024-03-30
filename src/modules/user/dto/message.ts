import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "stringOrNull", async: false })
export class IsStringOrNull implements ValidatorConstraintInterface {
  validate(value: unknown) {
    return typeof value === "string" || value === null;
  }

  defaultMessage() {
    return "El valor debe ser un string o un número";
  }
}

export class CreateContactMessageDTO {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: "";

  @IsString()
  @IsNotEmpty()
  fullName: "";

  @IsString()
  @IsNotEmpty()
  message: "";

  @Validate(IsStringOrNull)
  user: string | null;
}
