import { PartialType } from "@nestjs/mapped-types";
import { CreateSectionDto } from "./create-category.dto";

export class UpdateSectionDto extends PartialType(CreateSectionDto) {}
