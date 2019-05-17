const appName = 'caracal';
const { APP_SETTINGS_FILE_PATH, port = 10010 } = process.env;

module.exports = {
  appName,
  port,
  appSettingsFilePath: APP_SETTINGS_FILE_PATH,
};
