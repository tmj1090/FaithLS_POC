# Faith Lock & Safe | Job Management System
## Admin Guide (Rich)

This guide covers everything you do in the system. The tool is accessed at your Netlify URL from any browser. Sign in with the admin email and password.

---

### Your Responsibilities in the System

You own job assignment, job review, pricing, approvals, CSV export to QuickBooks, and account records. Techs handle completion forms. You handle everything before and after.

---

## Section 1: Assigning a Job

Go to **Admin > Assign**.

Fill out the form top to bottom:

- **Date** - the job date, not today's date unless it is today
- **Status** - use Scheduled for confirmed work, Quoted for jobs pending customer approval, Awaiting Parts if you are holding for materials
- **Account** - select the master account. If there is a sub-account (e.g., a specific school under the district), select it in the second dropdown
- **Job Type** - select from the catalog. This drives the category for reporting and export
- **Lead Tech** - the tech responsible for submitting the completion form
- **Assign Techs** - hold Ctrl (Windows) or Cmd (Mac) to select multiple techs. The lead must also be selected here
- **Scope of Work** - what the tech needs to know about the job before arriving. This is visible on the tech's job card
- **Site Notes** - gate codes, parking, who to ask for, access instructions. Separate from scope intentionally
- **Fixed Price** - check this if the job was quoted at a fixed amount. Enter the quoted dollar amount. The tech will see a red warning banner on their job card and will be told not to exceed scope without calling you
- **Expected Parts / Expected Labor** - optional. Pre-load parts and labor you expect the job to require. The tech sees these pre-filled on the completion form and adjusts as needed. Useful for repeat jobs or jobs where you already know the materials

Click **Assign Job**. The job is immediately visible to the assigned tech.

**Duplicate Last Job** copies the account, job type, and lead tech from the most recent assignment. Useful for repeat work at the same location.

---

## Section 2: Schedule Viewer

Still on the Assign page, scroll down to the **Schedule Viewer**. Enter a date range and click Load. This shows all non-cancelled jobs in that window with status badges. You can delete any job that has not yet been submitted or approved.

---

## Section 3: Reviewing Completed Jobs

Go to **Admin > Review**.

The default filter shows Pending Review. These are jobs techs have submitted and that need your eyes before export.

Click **Expand / Collapse** on any job card to see full details: scope, site notes, time in/out, payment type and detail, tech notes, and the full line item table.

**Line item overrides** - if a tech logged a part or labor entry that needs a cost correction, enter the corrected amount in the Override column and add a reason. Totals recalculate automatically. Click Save Overrides.

**Fixed price jobs** show the quoted amount vs. the actual line item total side by side so you can see margin at a glance.

**Actions on each job:**
- **Approve** - job is ready for export to QuickBooks
- **Flag** - job needs follow-up. You can add a review note explaining why
- **Reset** - sends the job back to Pending Review if you need to look at it again
- **Reopen / Edit** - opens a full edit modal where you can change anything: status, scope, site notes, time in/out, payment, tech notes, follow-up flag, and all line items. This is how you handle no-show jobs, jobs a tech forgot to fill out, or any record that needs correction after submission. You do not create a new job record. You edit the existing one

**Bulk Approve** appears when more than one Pending Review job is present. It approves all of them in one click. Use this at end of day or end of week when you have reviewed everything and are satisfied.

---

## Section 4: Searching Jobs

Go to **Admin > Search**.

Filter by any combination of: date range, account, tech, status, category, and address (partial text match). Results show job count and total revenue for the filtered set.

---

## Section 5: Exporting to QuickBooks

Go to **Admin > Export**.

Set a date range. The default filter is Approved Only, which is correct. Do not export unapproved jobs. Click **Generate CSV**. The file downloads to your computer. Import it into QuickBooks Desktop via File > Utilities > Import > Excel Files (or IIF depending on your QB version - check with Brenda).

---

## Section 6: Accounts

Go to **Admin > Accounts** (opens a separate page).

The account list shows all accounts with job counts, last service date, billing notes, and active status. Columns are sortable. Use the search bar to find by name, address, or phone.

Click **View** on any account to open the detail page. You will see:

- Stats: total jobs, total revenue, approved revenue, last service date
- Sub-accounts and their job counts
- **Job History tab** - full filterable job history for that account with totals. Export to CSV with the button in the tab bar
- **Quote Forms tab** - all quote forms tied to jobs for this account
- **Photos tab** - all photos uploaded for this account across all jobs
- **Instructions tab** - a free-text field for notes that should travel with every job at this account. Gate codes, key contacts, access restrictions, billing quirks. Save them here and brief techs before dispatch

Click **Edit** on any account to update name, address, phone, billing notes, parent account, or active status.

Click **+ Add Account** in the nav to create a new master or sub-account.

**Export CSV** next to the Refresh button exports the current filtered account list.

---

## Section 7: Reference Data

Go to **Admin > Reference**.

This is where you maintain the parts catalog, job types, labor types, and tech list. All rows are editable inline. Change any field and click Save. You can also add new entries at the top of each section and deactivate entries you no longer use.

Pricing in parts and job types is never visible to techs. They see names only.

---

## Section 8: New Customer Submissions

Go to **Admin > New Customers**.

When a tech submits a new customer from the field, it lands here. Review the record, click **Add to Accounts** to create a permanent account record, or **Dismiss** to discard it.

---

## Section 9: Calendar

Go to **Admin > Calendar**.

Select a tech from the dropdown. The week view shows that tech's assigned jobs by day, color-coded by status. Multi-tech jobs show a Lead badge on the lead tech's calendar. Use Prev Week / Next Week to navigate. Select All Techs to see all jobs without filtering by person.

---

## Workflow Summary

| Task | Where |
|---|---|
| Assign a job | Assign tab |
| See today's schedule | Assign > Schedule Viewer |
| Review submitted jobs | Review tab |
| Correct a job record | Review > Reopen / Edit |
| Approve for billing | Review > Approve or Bulk Approve |
| Export to QuickBooks | Export tab |
| Look up a customer | Accounts page |
| Add or edit account | Accounts > Add Account or Edit |
| Update parts / labor rates | Reference tab |
| See tech's week | Calendar tab |
| Handle field-submitted customers | New Customers tab |

---

## Things That Require Your Judgment

- Pricing overrides on line items always need a reason entered
- Fixed price jobs where actuals exceed the quote require a conversation with the tech before approval
- Do not approve a job you have not reviewed. Bulk approve is for when you have already scanned the queue
- The follow-up flag from a tech means they need you to follow up. Check flagged jobs daily
- Multi-visit jobs in v1: create a new job for the follow-up visit and note the original job ID in the scope field (e.g., "Follow-up to Job completed 4/18 - parts delivered, install per original scope")
