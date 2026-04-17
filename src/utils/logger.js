const isDev = process.env.NODE_ENV === "development";

const formatMessage = (level, message, data) => {
  const timestamp = new Date().toISOString();
  return data !== undefined
    ? `[${timestamp}] [${level}] ${message}`
    : `[${timestamp}] [${level}] ${message}`;
};

const logger = {
  debug: (message, data) => {
    if (!isDev) return;
    if (data !== undefined) {
      console.log(formatMessage("DEBUG", message), data);
    } else {
      console.log(formatMessage("DEBUG", message));
    }
  },
  info: (message, data) => {
    if (data !== undefined) {
      console.info(formatMessage("INFO", message), data);
    } else {
      console.info(formatMessage("INFO", message));
    }
  },
  warn: (message, data) => {
    if (data !== undefined) {
      console.warn(formatMessage("WARN", message), data);
    } else {
      console.warn(formatMessage("WARN", message));
    }
  },
  error: (message, data) => {
    if (data !== undefined) {
      console.error(formatMessage("ERROR", message), data);
    } else {
      console.error(formatMessage("ERROR", message));
    }
  },
};

export default logger;