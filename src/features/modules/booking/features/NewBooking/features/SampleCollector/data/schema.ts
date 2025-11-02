import type { IResponseInterface } from "@/features/modules/booking/data/schema";
import type { AddressType } from "../../CreatePatientFeature/data/schema";


export interface ISampleCollector {
  id: number;
  name: string;
  code: string;
  dob: string;
  doj: string;
  email: string;
  contactNo: string;
  education: string;
  pan: string;
  image: string;
  status: string;
  departmentId: number;
  designationId: number;
  employeeGroupId: number;
  shiftId: number;
  gradeId: number;
  department: Department;
  designation: Designation;
  address: AddressType;
}

export interface Department {
  id: number;
  name: string;
  code: string;
  status: string;
}

export interface Designation {
  id: number;
  name: string;
  code: string;
  status: string;
}



export interface ISampleCollectorResponse extends IResponseInterface{
    data: ISampleCollector[]
}