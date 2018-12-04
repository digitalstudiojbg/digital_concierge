export const API_URL =
    process.env.NODE_ENV === "production"
        ? "http://digitalconcierge-env.uir8vfstfw.ap-southeast-2.elasticbeanstalk.com/api"
        : "http://localhost:3000";
