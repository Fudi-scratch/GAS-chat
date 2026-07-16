function doGet() {
  return HtmlService
    .createTemplateFromFile("index")
    .evaluate()
    .setTitle("GAS Chat");
}
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
