export interface Review {
  Review_id: string;
  user_id: string;
  Specialists_id: string;
  Stars: number;
  Review: string;
}

export interface reviewResponse {
  Reviews: [
    {
      Review_id: string;
      user_id: string;
      Specialists_id: string;
      Stars: number;
      Review: string;
    }
  ];
  error:{
    name: string;
    message:string;
  }
}