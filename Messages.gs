// ===== Messages.gs =====

function sendMessage(userId, message) {

  message = String(message).trim();

  if (message.length === 0) {
    throw new Error("メッセージを入力してください。");
  }

  if (message.length > 100) {
    throw new Error("100文字までです。");
  }

  const nickname = getNickname(userId);

  if (nickname === "") {
    throw new Error("ニックネームが登録されていません。");
  }

  const sheet = getSheet(MESSAGE_SHEET);

  sheet.appendRow([
    generateId(8),
    userId,
    nickname,
    new Date(),
    message,
    ""
  ]);
}

function getMessages() {
  const sheet = getSheet(MESSAGE_SHEET);
  const values = sheet.getDataRange().getValues();

  const messages = [];

  for (let i = 1; i < values.length; i++) {
    messages.push({
      messageId: values[i][0],
      userId: values[i][1],
      nickname: values[i][2],
      time: values[i][3],
      message: values[i][4],
      readUsers: values[i][5]
    });
  }

  return messages;
}
// ===========================
// メッセージ編集
// ===========================

function editMessage(messageId, userId, newMessage) {

  newMessage = String(newMessage).trim();

  if (newMessage.length === 0) {
    throw new Error("メッセージを入力してください。");
  }

  if (newMessage.length > 100) {
    throw new Error("100文字までです。");
  }

  const sheet = getSheet(MESSAGE_SHEET);
  const values = sheet.getDataRange().getValues();

  for (let i = 1; i < values.length; i++) {

    if (
      values[i][0] === messageId &&
      values[i][1] === userId
    ) {

      sheet.getRange(i + 1, 5).setValue(newMessage);

      return "OK";

    }

  }

  throw new Error("メッセージが見つかりません。");

}

// ===========================
// メッセージ削除
// ===========================

function deleteMessage(messageId, userId) {

  const sheet = getSheet(MESSAGE_SHEET);
  const values = sheet.getDataRange().getValues();

  for (let i = 1; i < values.length; i++) {

    if (
      values[i][0] === messageId &&
      values[i][1] === userId
    ) {

      sheet.deleteRow(i + 1);

      return "OK";

    }

  }

  throw new Error("メッセージが見つかりません。");

}

// ===========================
// 既読追加
// ===========================

function markAsRead(messageId, userId) {

  const nickname = getNickname(userId);

  const sheet = getSheet(MESSAGE_SHEET);
  const values = sheet.getDataRange().getValues();

  for (let i = 1; i < values.length; i++) {

    if (values[i][0] !== messageId) continue;

    let readUsers = String(values[i][5]).trim();

    let list = [];

    if (readUsers !== "") {

      list = readUsers.split(",");

    }

    const data = userId + ":" + nickname;

    let exists = false;

    for (let item of list) {

      if (item.startsWith(userId + ":")) {

        exists = true;
        break;

      }

    }

    if (!exists) {

      list.push(data);

      sheet.getRange(i + 1, 6).setValue(list.join(","));

    }

    return "OK";

  }

}
