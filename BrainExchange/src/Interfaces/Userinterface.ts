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
    user_id: string,
    Username: string,
    Email: string,
    created_at: string,
    Phone_number: string,
    Password: string,
    Role: string
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
  created_at: string;
  Phone_number: string;
  Password: string;
}


export interface updateUser {
  user_id: string;
  Username: string;
  Email: string;
  created_at: string;
  Phone_number: string;
  Password: string;
}

export interface setRole{
  user_id: string;
  Role: string;
}