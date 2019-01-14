export const API_URL =
    process.env.NODE_ENV === "production"
        ? "http://platypus-env.bxpjxuug9t.ap-southeast-2.elasticbeanstalk.com/api"
        : "http://localhost:3000";
