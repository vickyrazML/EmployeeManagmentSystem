import { FormGroup, Validator } from "@angular/forms";

export interface Department {
  id: number;
  name: string;
}

export interface employee {
    emp_Id: number;
    emp_Name: string;
    dob: Date | string;
    phoneNumber: string;
    email_Id: string;
    gender: string;
    jobTitle: string;
    joining_Date?: Date | string;
    leaving_Date?: Date | string; 
    salary: number;
    address: string;
    created_Date: Date | string;
    departmentId?: number | string;
}

export interface column {
  id: string;
  name: string;
}

export type controlType = 'text' | 'number' | 'email' | 'date' | 'select' | 'textarea';

export type OptionType = {
  id: string | number;
  name: string;
  selectedId?: string | number;
};

export interface FieldConfig {
  type: controlType;
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  vaidations?: [message: string];
  options?: OptionType[];
}

export interface TpageForm {
  formGroup: FormGroup;
  formStatus: {formSubmitted: boolean};
  formValid: boolean;
}