import nodemailer from 'nodemailer';

let transporter = null;

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_EMAIL_PASS
      }
    });
  }
  return transporter;
};

export const sendOrderNotification = async (orderData) => {
  const { buyer, seller, book, orderId, totalPrice } = orderData;

  const sellerEmailTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #4f46e5; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .order-details { background: white; padding: 15px; border-radius: 5px; margin: 10px 0; }
        .footer { text-align: center; padding: 20px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>VUEDU BOOK BANK - New Order Received!</h1>
        </div>
        <div class="content">
          <h2>Hello ${seller.name},</h2>
          <p>You have received a new order for your book!</p>
          
          <div class="order-details">
            <h3>Order Details:</h3>
            <p><strong>Order ID:</strong> ${orderId}</p>
            <p><strong>Book:</strong> ${book.title} (${book.courseCode})</p>
            <p><strong>Price:</strong> Rs. ${totalPrice}</p>
            <p><strong>Buyer Name:</strong> ${buyer.name}</p>
            <p><strong>Buyer Email:</strong> ${buyer.email}</p>
            <p><strong>Buyer Phone:</strong> ${buyer.phone}</p>
            ${buyer.whatsapp ? `<p><strong>Buyer WhatsApp:</strong> ${buyer.whatsapp}</p>` : ''}
            <p><strong>Buyer Address:</strong> ${buyer.address}</p>
          </div>
          
          <p>Please contact the buyer to arrange delivery. You can reach them at:</p>
          <ul>
            <li>Email: ${buyer.email}</li>
            <li>Phone: ${buyer.phone}</li>
            ${buyer.whatsapp ? `<li>WhatsApp: ${buyer.whatsapp}</li>` : ''}
          </ul>
        </div>
        <div class="footer">
          <p>VUEDU BOOK BANK - Connecting VU Students</p>
          <p>Visit us at: <a href="https://vuedu.dev">vuedu.dev</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

  const buyerEmailTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #4f46e5; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .order-details { background: white; padding: 15px; border-radius: 5px; margin: 10px 0; }
        .footer { text-align: center; padding: 20px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>VUEDU BOOK BANK - Order Confirmation</h1>
        </div>
        <div class="content">
          <h2>Hello ${buyer.name},</h2>
          <p>Thank you for your order! Your order has been placed successfully.</p>
          
          <div class="order-details">
            <h3>Order Details:</h3>
            <p><strong>Order ID:</strong> ${orderId}</p>
            <p><strong>Book:</strong> ${book.title} (${book.courseCode})</p>
            <p><strong>Price:</strong> Rs. ${totalPrice}</p>
            <p><strong>Seller Name:</strong> ${seller.name}</p>
            <p><strong>Seller Email:</strong> ${seller.email}</p>
            <p><strong>Seller Phone:</strong> ${seller.phone}</p>
            ${seller.whatsapp ? `<p><strong>Seller WhatsApp:</strong> ${seller.whatsapp}</p>` : ''}
          </div>
          
          <p>The seller will contact you soon to arrange delivery. You can also reach the seller at:</p>
          <ul>
            <li>Email: ${seller.email}</li>
            <li>Phone: ${seller.phone}</li>
            ${seller.whatsapp ? `<li>WhatsApp: ${seller.whatsapp}</li>` : ''}
          </ul>
          
          <p>Thank you for choosing VUEDU BOOK BANK!</p>
        </div>
        <div class="footer">
          <p>VUEDU BOOK BANK - Connecting VU Students</p>
          <p>Visit us at: <a href="https://vuedu.dev">vuedu.dev</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const emailTransporter = getTransporter();
    
    await Promise.all([
      emailTransporter.sendMail({
        from: process.env.MY_EMAIL,
        to: seller.email,
        subject: `New Order Received - ${book.title} (${book.courseCode})`,
        html: sellerEmailTemplate
      }),
      emailTransporter.sendMail({
        from: process.env.MY_EMAIL,
        to: buyer.email,
        subject: `Order Confirmation - ${book.title} (${book.courseCode})`,
        html: buyerEmailTemplate
      })
    ]);

    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error.message };
  }
};