function setConfig(config: {calendarId: string, employeeId: string, colorMappings: { [key: string]: string }}) {
    PropertiesService.getScriptProperties().setProperty('config', JSON.stringify(config));
  }
  
function getConfig() {
  const defaultConfig = getDefaultConfig()
  try {
    const configString = PropertiesService.getScriptProperties().getProperty('config');
    return configString ? JSON.parse(configString) : defaultConfig;
  } catch (e) {
    console.error('Error parsing config:', e);
    return defaultConfig;
  }
}