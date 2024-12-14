/* eslint-disable @typescript-eslint/no-explicit-any */



export type CommonProps = {className?: string, id?: string}

export type AnyObject = {[key: string]: any}

export interface FormDataProps {
    label:string;
    id: string;
    uid: string;
    type: string;
    name: string;
    validations?: {
      required?: boolean,
      maxLength?: number,
    };
    errorMessages?: {
      required?: string,
      maxLength?: string,
    };
  }


  export interface PersonalInfoInputs{
    role: string;
    mobile: string;
    email: string;
    linkedinlabel: string;
    linkedinlink: string;
    portfoliolink: string;
    address: string;
    summary: string;
  }


 export interface PointsProps {
  subhead?: string;
  subcontent: string;
  id?: string;
  _id?: 'string';

}


export type Points = {
  points?: PointsProps[]
}


export interface ExperienceInputs {
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  content: string;
}

export interface ExperienceProps extends ExperienceInputs, Points{
  _id?: string
  id?: string
}


export interface ExperienceArr {
  experience: ExperienceProps[]
}


export type Skills = {
  skills: string[]
}

export type Tools = {
  tools: string[]
}





export interface EducationDetailsInputs{
  course: string;
  specialization: string;
  college: string;
  startDate: string;
  endDate: string;
  grade: string;
}



export interface EducationProps extends EducationDetailsInputs{
  _id?: string
  id?: string
}


export interface EducationArr {
  education: EducationProps[]
}

export interface documentProps extends PersonalInfoInputs, ExperienceArr,EducationArr, Skills, Tools {
  _id?: string;
  name: string;
  templatename: string;
 }