export interface Category {
  category_id: string;
  categoryname: string;
  image: string;
}

export interface categoriesResponse {
  Categories: [
    {
      category_id: string;
      categoryname: string;
      image: string;
    }
  ];
  error: {
    name: string;
    message: string;
  };
}

export interface Specialists{
  user_id:  string;
  First_Name: string;
  Last_Name: string;
  Speciality: string;
  Rate: number;
  Description: string;
  categoryname: string;
}