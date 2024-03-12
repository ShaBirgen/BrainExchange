export const sqlConfig = {
  user: "sa",
  password: "37853801",
  database: "BrainExchange",
  server: "DESKTOP-QO3AGRF",
  // SECRET= "20a73a417c074a01b906b792f06c5a12a90493f3ffbe3e7be85fc7a8dc221ffb"
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};
