import { FilterProductDTO, ProductFieldsDTO, RespProductDTO } from "./product";

export class CreateMedicineDTO extends ProductFieldsDTO {}

export class UpdateMedicineDTO extends ProductFieldsDTO {}

export class FilterMedicinesDTO extends FilterProductDTO {}

export type RespMedicineDTO = Omit<RespProductDTO, "type">;
