function setConfig(calendarId: string, employeeId: string, colorMappings: { [key: string]: string }) {
    const config = {
      calendarId: calendarId,
      employeeId: employeeId,
      colorMappings: colorMappings,
    };
    PropertiesService.getScriptProperties().setProperty('config', JSON.stringify(config));
  }
  
  function getConfig() {
    const defaultConfig = { calendarId: '', employeeId: '', colorMappings: {} }; 
    try {
      const configString = PropertiesService.getScriptProperties().getProperty('config');
      return configString ? JSON.parse(configString) : defaultConfig;
    } catch (e) {
      console.error('Error parsing config:', e);
      return defaultConfig;
    }
  }