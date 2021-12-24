import sgMail from "@sendgrid/mail";

export const sendMail = (
  to: string,
  subject: string,
  text: string,
  html: string,
  cc?: string
) => {
  const msg = {
    to: to,
    from: process.env.SEND_GRID_SENDER!,
    subject: subject,
    text: text,
    html: html,
  };

  console.log(msg)

  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

  sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
    })
    .catch((error) => {
      console.error(error);
    });
};
