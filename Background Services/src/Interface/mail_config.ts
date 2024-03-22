export interface mailConfig {
  service: string;
  host: string;
  port: number;
  requireTLS: boolean;
  auth: {
    user: string;
    pass: string;
  };
}
