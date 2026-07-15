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
    generateId(8),               // MessageID
    userId,                      // UserID
    nickname,                    // Nickname
    new Date(),                  // Time
    message,                     // Message
    ""                           // ReadUsers
  ]);

  return "OK";
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
