export interface ordersResponse {
    gigs:[
        {
    Gig_id: string;
    user_id: string;
    Specialists_id: string;
    Description: string;
    Deadline: string;
    Salary: string;
    Duration: string;
    isDeleted: string;
    Username: string;
        }
    ]
}

export interface Order {
    Gig_id: string;
    user_id: string;
    Specialists_id: string;
    Description: string;
    Deadline: string;
    Salary: string;
    Duration: string;
    isDeleted: string;
    Username: string;
}