## Getting Started

Run the development server:

```bash
npm run dev
```

## Webhook Setup

This application provides a webhook endpoint for Claap recordings. To set up the webhook:

1. Deploy the application to a publicly accessible URL
2. Configure the webhook URL in your Claap settings:
   - The webhook endpoint will be: `https://your-domain.com/api/claap/webhook`
   - The webhook will receive POST requests with recording data
   - All webhook payloads are automatically logged to the `logs` directory

The webhook handler will:
- Receive recording data from Claap
- Create a `logs` directory if it doesn't exist
- Save each webhook payload as a JSON file with the format: `{recordingId}_{channelName}_{date}.json`

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
