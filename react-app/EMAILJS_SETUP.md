# EmailJS Setup Instructions

To enable automatic email attachments with voice recordings, you need to set up EmailJS.

## Steps:

1. **Create an EmailJS account** at https://www.emailjs.com/

2. **Add an Email Service:**
   - Go to "Email Services" in your EmailJS dashboard
   - Choose your email provider (Gmail recommended)
   - Follow the setup instructions

3. **Create an Email Template:**
   - Go to "Email Templates" in your EmailJS dashboard
   - Create a new template with these variables:
     - `{{to_email}}` - Recipient email
     - `{{from_name}}` - Sender name
     - `{{subject}}` - Email subject
     - `{{message}}` - Email body
     - `{{date}}` - Date
     - `{{company}}` - Company name

4. **Add Environment Variables:**
   Create a `.env` file in the `react-app` directory with:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

5. **Get your credentials:**
   - Service ID: Found in "Email Services" section
   - Template ID: Found in "Email Templates" section
   - Public Key: Found in "Account" → "General" section

## Without EmailJS:

If you don't set up EmailJS, the app will automatically:
- Download the audio file
- Open Gmail compose with pre-filled content
- You can manually attach the downloaded file

The fallback method works great and doesn't require any setup!

