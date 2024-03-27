export interface registerUser {
  Username: string;
  Email: string;
  Created_at: string;
  Phone_number: string;
  Password: string;
}
export interface loginDetails {
  // Username: string;
  Email: string;
  Password: string;
}

export interface usersResponse {
  users: [
    {
      user_id: string;
      Username: string;
      Email: string;
      created_at: string;
      Phone_number: string;
      Password: string;
      Role: string;
    }
  ];
  error: {
    name: string;
    message: string;
  };
  messageerror: string;
}

export interface User {
  user_id: string;
  Username: string;
  Email: string;
  created_at: string;
  Phone_number: string;
  Password: string;
  Role: string;
}

export interface oneUserResponse {
  user: [
    {
      user_id: string;
      Username: string;
      Email: string;
      Role: string;
      Phone_number: string;
      created_at: string;
      First_Name: string;
      Last_Name: string;
      Speciality: string
      categoryname: string;
      Rate: number;
      Description: string
      Profile_Image: string;
    }
  ];
  error: {
    name: string;
    message: string;
  };
  messageerror: string;
}

export interface userResponse {
      user_id: string;
      Username: string;
      Email: string;
      Role: string;
      Phone_number: string;
      created_at: string;
      First_Name: string;
      Last_Name: string;
      Speciality: string
      categoryname: string;
      Rate: number;
      Description: string;
      Profile_Image: string;
}

export interface updateUser {
  user_id: string;
  Username: string;
  Email: string;
  created_at: string;
  Phone_number: string;
  // Password: string;
}

export interface setRole {
  user_id: string;
  Role: string;
}

export interface specialist {
  First_Name: string;
  Last_Name: string;
  Speciality: string;
  Rate: number;
  Description: string;
  Email: string;
}
