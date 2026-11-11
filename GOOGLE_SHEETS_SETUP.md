# Fleet partner Google Sheet connection

The partner form posts to a server-side Next.js route. Google credentials stay on the server and are never sent to the browser.

## Configure Google Sheets

1. Create a Google Cloud service account and enable the Google Sheets API for its project.
2. Create a spreadsheet with a tab named `Partner Applications` (or set a different tab in the environment).
3. Share the spreadsheet with the service account email and give it **Editor** access.
4. Add this header row in columns A–M:

   `Application ID`, `Submitted At`, `Full Name`, `Mobile Number`, `Business Name`, `City`, `Fleet Area`, `Vehicle Brand`, `Vehicle Model`, `Vehicle Age (Years)`, `Vehicle Colour`, `Vehicle Registration Number`, `Status`

5. Copy `.env.local.example` to `.env.local`. Set the spreadsheet ID from its URL, service account email, and private key. Keep `.env.local` private. When deploying, set the same values as server environment secrets.
6. Restart the Next.js server and submit a partner application. One row is added per vehicle; rows from the same application share an application ID. New applications start with `PENDING_REVIEW` status.

The endpoint is `POST /api/fleet-partners`. It validates partner fields, vehicle fields, and duplicate registration numbers before appending rows. It returns an application reference after Google confirms the append.
