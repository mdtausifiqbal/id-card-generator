/// <reference types="./images.d.ts" />

export enum CompanyType {
  VOLTAS = "Voltas",
  CARRIER = "Carrier",
  DAIKIN = "Daikin",
}

export interface EmployeeDetails {
  name: string;
  designation: string;
  empId: string;
  validUpto: string;
  photo: string | null;
}

export interface ServiceCenterDetails {
  name: string;
  mobile: string;
  address: string;
  signatoryImage: string | null;
}

export interface IDCardState {
  company: CompanyType;
  employee: EmployeeDetails;
  serviceCenter: ServiceCenterDetails;
}
