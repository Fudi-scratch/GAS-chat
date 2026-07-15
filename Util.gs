const MESSAGE_SHEET = "Messages";
const USER_SHEET = "Users";

const SPREADSHEET_ID = "1W6agAfXTjNmWC1deWXP63e0bR-X6j11emdhRzzqkLlU";

function getSpreadsheet() {
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

function getSheet(name) {
  const ss = getSpreadsheet();
  let sheet = ss.getSheetByName(name);

  if (!sheet) {
    sheet = ss.insertSheet(name);

    if (name === MESSAGE_SHEET) {
      sheet.appendRow([
        "MessageID",
        "UserID",
        "Nickname",
        "Time",
        "Message",
        "ReadUsers"
      ]);
    }

    if (name === USER_SHEET) {
      sheet.appendRow([
        "UserID",
        "Nickname"
      ]);
    }
  }

  return sheet;
}

function generateId(length = 6) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  let id = "";

  for (let i = 0; i < length; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }

  return id;
}
