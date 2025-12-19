import { createTransport } from "nodemailer"
import { ENV } from "./env";

export const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: ENV.HOST_EMAIL_ADDRESS,
        pass: ENV.HOST_EMAIL_PASSWORD,
    },
});