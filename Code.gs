function doGet() {
  return HtmlService.createHtmlOutputFromFile("index")
    .setTitle("GAS Chat");
}
