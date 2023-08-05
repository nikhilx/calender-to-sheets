function getDefaultConfig() {
  return {
    "calendarId": "",
    "employeeId": "",
    "colorMappings": {
      [CalendarApp.EventColor.PALE_BLUE]: { "project": "", "job": "" },
      [CalendarApp.EventColor.PALE_GREEN]: { "project": "", "job": "" },
      [CalendarApp.EventColor.MAUVE]: { "project": "", "job": "" },
      [CalendarApp.EventColor.PALE_RED]: { "project": "", "job": "" },
      [CalendarApp.EventColor.YELLOW]: { "project": "", "job": "" },
      [CalendarApp.EventColor.ORANGE]: { "project": "", "job": "" },
      [CalendarApp.EventColor.CYAN]: { "project": "", "job": "" },
      [CalendarApp.EventColor.GRAY]: { "project": "", "job": "" },
      [CalendarApp.EventColor.BLUE]: { "project": "", "job": "" },
      [CalendarApp.EventColor.GREEN]: { "project": "", "job": "" },
      [CalendarApp.EventColor.RED]: { "project": "", "job": "" }
    }
  }
}

function getColorCodes() {
  return {
    PALE_BLUE: CalendarApp.EventColor.PALE_BLUE,
    PALE_GREEN: CalendarApp.EventColor.PALE_GREEN,
    MAUVE: CalendarApp.EventColor.MAUVE,
    PALE_RED: CalendarApp.EventColor.PALE_RED,
    YELLOW: CalendarApp.EventColor.YELLOW,
    ORANGE: CalendarApp.EventColor.ORANGE,
    CYAN: CalendarApp.EventColor.CYAN,
    GRAY: CalendarApp.EventColor.GRAY,
    BLUE: CalendarApp.EventColor.BLUE,
    GREEN: CalendarApp.EventColor.GREEN,
    RED: CalendarApp.EventColor.RED
  };
}