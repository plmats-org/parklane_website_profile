import {
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
} from "@getbrevo/brevo";

const apiKey = process.env.BREVO_API_KEY || "";
const senderEmail = process.env.BREVO_FROM_EMAIL || "john@email.org";
const senderName = process.env.BREVO_FROM_NAME || "Parklane";

const brevo = new TransactionalEmailsApi();
if (apiKey) brevo.setApiKey(TransactionalEmailsApiApiKeys.apiKey, apiKey);

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  await brevo.sendTransacEmail({
    sender: { email: senderEmail, name: senderName },
    to: [{ email: to }],
    subject,
    htmlContent: html,
  });
}
