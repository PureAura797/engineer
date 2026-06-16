import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string || 'Не указано';
    const phone = formData.get('phone') as string || 'Не указано';
    const message = formData.get('message') as string || 'Нет сообщения';
    const source = formData.get('source') as string || 'Сайт';
    
    const uploadedFiles = formData.getAll('files') as File[];
    
    // Create HTML body
    const htmlBody = `
      <h2>Новая заявка с сайта (${source})</h2>
      <p><strong>Имя:</strong> ${name}</p>
      <p><strong>Контакт (Телефон/Email):</strong> ${phone}</p>
      <p><strong>Сообщение/Проблема:</strong> ${message}</p>
      <hr />
      <p><small>Письмо сгенерировано автоматически с сайта МЗТА Инжиниринг.</small></p>
    `;

    // Process file attachments if present
    const attachments = [];
    for (const file of uploadedFiles) {
      if (file && file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        attachments.push({
          filename: file.name,
          content: buffer,
        });
      }
    }

    // Verify SMTP config exists
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn("SMTP credentials not configured. Skipping email send. Payload:", { name, phone, message });
      // Simulate success for frontend testing if no credentials provided
      return NextResponse.json({ success: true, warning: 'SMTP credentials missing, email not actually sent.' });
    }

    // Configure Nodemailer transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || '',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: Number(process.env.SMTP_PORT) === 465, 
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"МЗТА Заявки" <${process.env.SMTP_USER}>`,
      to: 'gerasimov@mzta.ru',
      subject: `Новая заявка: ${source} - ${phone}`,
      html: htmlBody,
      attachments,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 });
  }
}
