function showImportAttributesDialog() {
    const html = HtmlService.createHtmlOutputFromFile('importAttributes')
        .setTitle('Import Attributes')
        .setWidth(400)
        .setHeight(400);
    SpreadsheetApp.getUi().showModalDialog(html, 'Import Attributes');
  }
  
  function showSettingsDialog() {
    const html = HtmlService.createHtmlOutputFromFile('settings')
        .setTitle('Settings')
        .setWidth(500)
        .setHeight(500);
    SpreadsheetApp.getUi().showModalDialog(html, 'Settings');
  }