/// <reference types="./images.d.ts" />

import { Template } from "@/components/templates";
import type { Company } from "@/lib/companies";

export type { Company, CompanyName } from "@/lib/companies";

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

export interface TemplateProps extends React.HTMLAttributes<HTMLDivElement> {
  company: Company;
  employee: EmployeeDetails;
  sc: ServiceCenterDetails;
  refs: React.RefObject<HTMLDivElement>[];
}

export interface IDCardState {
  template: Template;
  company: Company;
  employee: EmployeeDetails;
  sc: ServiceCenterDetails;
}
