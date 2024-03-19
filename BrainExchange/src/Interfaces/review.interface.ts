export interface Review {
  Review_id: string;
  user_id: string;
  Specialists_id: string;
  review: string;
}

export interface reviewResponse {
  Reviews: [
    {
      Review_id: string;
      user_id: string;
      Specialists_id: string;
      review: string;
    }
  ];
  error:{
    name: string;
    message:string;
  }
}