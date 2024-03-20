export interface User {
  user_id: string;
  Username: string;
  Email: string;
  Role: string;
  Created_at: string;
  Password: string;
  Phone_number: string;
  isdeleted: boolean;
}

export interface loginUserDetails {
  user_id: string;
  Username: string;
  Email: string;
  Role: string;
}

export interface Specialist{
  First_Name: string;
  Last_Name: string;
  Speciality: string;
  Rate: number;
  Description: string;
}