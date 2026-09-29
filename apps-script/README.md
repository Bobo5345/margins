# Connecting the enrolment form to a Google Sheet

About 5 minutes, done once.

1. Create a new Google Sheet (e.g. "Margins enrolments") with the account that should own the data.
2. In the Sheet: **Extensions → Apps Script**. Delete what's there, paste in all of `Code.gs`, and save.
3. Click **Deploy → New deployment**. Next to "Select type", pick **Web app**, then set:
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy** and approve the permissions. Google warns it's "unverified" because it's your own script: choose Advanced → Go to project.
5. Copy the **Web app URL** (it ends in `/exec`).
6. Paste it into `src/config.js` as `enrollEndpoint`, then rebuild and redeploy the site.

Check it: open the `/exec` URL in a browser and you should see `{"ok":true,...}`.
Entries appear in the **Enrolments** tab, which the script creates the first time someone submits.

**If you edit `Code.gs` later:** go to Deploy → Manage deployments → edit (pencil) → Version: **New version** → Deploy.
That keeps the same URL, so the site doesn't need changing.

The script rejects a second enrolment from the same phone number. To let people change their entry,
edit their row in the Sheet directly.
