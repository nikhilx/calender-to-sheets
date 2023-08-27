const onOpen = () => {
    const menuEntries = [
      {name: "Import", functionName: "showImportAttributesDialog"},
      {name: "Settings", functionName: "showSettingsDialog"}
    ];

    const activeSheet = SpreadsheetApp.getActiveSpreadsheet();
    activeSheet.addMenu('Import Timesheet', menuEntries);
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
  range.setValues([["Date", "Project Name", "Job Name", "Work Item", "Hours", "Description", "Employee id"]]);
  range.setFontWeight("bold");

  // {eventName_eventDay: <values according to headers>}. Doing this as events on the same name
  // on the same day needs to have their duration added instead of having two rows in the csv
  const csvRowsObject = {}

  for (const event of events) {
    let duration = (event.getEndTime().getTime() - event.getStartTime().getTime()) / (60 * 60 * 1000); // Duration in hours
    let color = event.getColor();
    let projectName = colorMappings[color]?.project || "";
    let jobName = colorMappings[color]?.job || "";
    let eventDate = Utilities.formatDate(event.getStartTime(), Session.getScriptTimeZone(), "dd-MMM-yyyy");

    const lookupKey = `${event.getTitle()}_${eventDate}`
    if (csvRowsObject.hasOwnProperty(lookupKey)){
      // Add duration for an existing event on the same day
      csvRowsObject[lookupKey][4] += duration
    } else {
      // create a new row
      csvRowsObject[lookupKey] = [eventDate, projectName, jobName, event.getTitle(), duration, event.getDescription(), config.employeeId];
    }
  }

   // Write the csvRowsObject to the sheet
   let row = 2; // starting from the second row
   let lastEventDate = null; // to track the last event's date
   for (let key in csvRowsObject) {
     let currentEventDate = csvRowsObject[key][0]; // Extract the date from the current event details

     if(lastEventDate && currentEventDate !== lastEventDate) {
        sheet.getRange(row, 1, 1, 7).setValues([["", "", "", "", "", "", ""]]);
        row++;
     }

     let details = [csvRowsObject[key]];
     range = sheet.getRange(row, 1, 1, 7);
     range.setValues(details);
     sheet.getRange(row, 5).setNumberFormat('0.00'); // Format the Hours column
     row++;
     
     lastEventDate = currentEventDate  
   }
}