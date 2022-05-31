import mail from '@sendgrid/mail';
import { NextApiHandler } from 'next';

mail.setApiKey(process.env.SENDGRID_API_KEY ?? '');

const handler: NextApiHandler = async (req, res) => {
  const body = JSON.parse(req.body);

  const message = `
    Dzień dobry, proszę o kontakt.\r\n
    Email: ${body.email}.\r\n\r\n

    Pozdrawiam.
  `;

  return mail
    .send({
      to: 'sebcia7@gmail.com',
      from: 'no-reply@vouchertatry.pl',
      replyTo: body.email,
      subject: 'Zapytanie o dostęp do platformy VoucherTatry',
      text: message,
      html: message.replace(/\r\n/g, '<br>'),
    })
    .then(() => res.status(200).json({ message: 'Email sent' }))
    .catch((error) =>
      res.status(500).json({ message: 'Email not sent', error })
    );
};

export default handler;
