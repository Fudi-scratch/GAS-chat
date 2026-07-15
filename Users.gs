// ===== Users.gs =====

function getUser(userId) {
  const sheet = getSheet(USER_SHEET);
  const values = sheet.getDataRange().getValues();

  for (let i = 1; i < values.length; i++) {
    if (values[i][0] === userId) {
      return {
        userId: values[i][0],
        nickname: values[i][1]
      };
    }
  }

  return null;
}

function saveUser(userId, nickname) {
  nickname = String(nickname).trim();

  if (nickname.length === 0) {
    throw new Error("ニックネームを入力してください。");
  }

  if (nickname.length > 20) {
    nickname = nickname.substring(0, 20);
  }

  const sheet = getSheet(USER_SHEET);
  const values = sheet.getDataRange().getValues();

  for (let i = 1; i < values.length; i++) {
    if (values[i][0] === userId) {
      sheet.getRange(i + 1, 2).setValue(nickname);
      return;
    }
  }

  sheet.appendRow([userId, nickname]);
}

function getNickname(userId) {
  const user = getUser(userId);

  if (user) {
    return user.nickname;
  }

  return "";
}
