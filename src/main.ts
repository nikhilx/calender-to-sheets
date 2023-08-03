const onOpen = () => {
    const menuEntries = [
      {name: "Import", functionName: "showImportAttributesDialog"},
      {name: "Settings", functionName: "showSettingsDialog"}
    ];

    const activeSheet = SpreadsheetApp.getActiveSpreadsheet();
    activeSheet.addMenu('Import Calendar', menuEntries);
} 

function importCalendarEntries(startDateStr: string, endDateStr: string) {
  // Retrieve configuration
  const config = getConfig();
  const calendarId = config.calendarId;
  const colorMappings = config.colorMappings;
  const calendar = CalendarApp.getCalendarById(calendarId);

  // Convert startDate and endDate to Date objects
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  // Get events based on filters
  const events = calendar.getEvents(startDate, endDate);

  // Prepare the target sheet
  let sheet = SpreadsheetApp.getActiveSheet();
  let range = sheet.getRange("A1:G1");
  range.setValues([["Date", "Project", "Job Name", "Work Item", "Hours", "Description", "EmployeeID"]]);
  range.setFontWeight("bold");

  // Display events
  for (let i = 0; i < events.length; i++) {
    let row = i + 2; // starting from the second row
    let event = events[i];
    let duration = (event.getEndTime().getTime() - event.getStartTime().getTime()) / (60 * 60 * 1000); // Duration in hours
    let color = event.getColor();
    Logger.log(`${event.getTitle()}: COLOR: ${color}`)
    let projectName = colorMappings[color]?.project || "Unknown";
    let jobName = colorMappings[color]?.job || "Unknown";

    let eventDate = Utilities.formatDate(event.getStartTime(), Session.getScriptTimeZone(), "dd-MMM-yyyy");

    let details = [
      [eventDate, projectName, jobName, event.getTitle(), duration, event.getDescription(), config.employeeID]
    ];

    range = sheet.getRange(row, 1, 1, 7);
    range.setValues(details);
    sheet.getRange(row, 5).setNumberFormat('0.00'); // Format the Hours column
  }
}