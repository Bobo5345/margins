/**
 * Margins enrolment -> Google Sheet
 *
 * Paste this into the Sheet's Extensions -> Apps Script, then deploy it as a
 * Web app (see README.md in this folder). The website POSTs each enrolment here.
 */

const SHEET_NAME = 'Enrolments';
const HEADERS = ['Submitted at', 'Name', 'Branch', 'Batch', 'Semester', 'Phone', 'Contributions'];
const SEMESTERS = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'];
const KINDS = ['Write', 'Draw', 'Capture', 'Create'];

function doPost(e) {
  const p = (e && e.parameter) || {};

  // Honeypot filled in = a bot. Pretend it worked, store nothing.
  if (p.website) return json({ ok: true });

  const entry = clean(p);
  if (!entry) return json({ ok: false, error: 'invalid' });

  // One writer at a time, so two people submitting together can't collide.
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const sheet = getSheet();
    if (isEnrolled(sheet, entry.phone)) return json({ ok: false, error: 'duplicate' });

    sheet.appendRow([
      new Date(),
      safe(entry.name),
      safe(entry.branch),
      safe(entry.batch),
      entry.semester,
      "'" + entry.phone, // leading ' keeps "+91..." as text, not a number
      entry.contribute,
    ]);
    return json({ ok: true });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: 'server' });
  } finally {
    lock.releaseLock();
  }
}

// Lets you open the web app URL in a browser to check it's live.
function doGet() {
  return json({ ok: true, service: 'margins-enrolment' });
}

/** Re-validates everything server-side; returns a clean entry or null. */
function clean(p) {
  const name = String(p.name || '').trim().replace(/\s+/g, ' ');
  const branch = String(p.branch || '').trim();
  const batch = String(p.batch || '').trim();
  const semester = String(p.semester || '').trim();
  const phone = String(p.phone || '').trim();
  const contribute = String(p.contribute || '')
    .split(',')
    .map(function (s) { return s.trim(); })
    .filter(function (s) { return KINDS.indexOf(s) !== -1; });

  if (name.length < 2 || name.length > 80) return null;
  if (!branch || branch.length > 40) return null;
  if (!/^\d{4}–\d{4}$/.test(batch)) return null;
  if (SEMESTERS.indexOf(semester) === -1) return null;
  if (!/^\+91[6-9]\d{9}$/.test(phone)) return null;
  if (contribute.length === 0) return null;

  return { name: name, branch: branch, batch: batch, semester: semester, phone: phone, contribute: contribute.join(', ') };
}

function isEnrolled(sheet, phone) {
  const rows = sheet.getLastRow() - 1;
  if (rows < 1) return false;
  const phoneCol = HEADERS.indexOf('Phone') + 1;
  const phones = sheet.getRange(2, phoneCol, rows, 1).getDisplayValues();
  return phones.some(function (r) { return r[0] === phone; });
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sheet;
}

/** Stops a name like "=HYPERLINK(...)" being run as a formula in the Sheet. */
function safe(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
