// src/composables/useLogger.js
import { getCurrentInstance } from "vue";
import log from "loglevel";

// Estilos de color para cada nivel de log
const colors = {
  trace: "color: #B0BEC5",
  debug: "color: #c026d3",
  info: "color: #0284c7",
  warn: "color: #FFC107",
  error: "color: #F44336",
};
const logHistory = [];

const logLevel = import.meta.env.VITE_LOG_LEVEL || "INFO";

const currentLogLevel = Object.keys(log.levels).find(
  (log) => String(log) === String(logLevel.toUpperCase())
);

// Guardamos la configuración original
const originalFactory = log.methodFactory;

// Redefinimos el método factory para aplicar estilos y namespace
log.methodFactory = function (methodName, level, loggerName) {
  const rawMethod = originalFactory(methodName, level, loggerName);

  return function (...args) {
    if (currentLogLevel === "DEBUG") {
      const namespace = loggerName ? `[${loggerName}] ` : "";
      logHistory.push({
        log: `${new Date().toISOString()} ${namespace} ${args.join(" ")}`,
        timestamp: new Date().toISOString(),
        level: methodName,
        namespace: namespace,
        messages: args.join(""),
      });
      localStorage.setItem("logHistory", JSON.stringify(logHistory));
      rawMethod(`%c${namespace}${args.join(" ")}`, colors[methodName] || "");
    }
  };
};

log.setLevel(currentLogLevel);

// Función para crear loggers con namespace
export function createLogger() {
  const namespace = getCurrentInstance()?.type?.__name
    ? `nexo:app:${getCurrentInstance()?.type?.__name}`
    : "nexo:app:Unknown";
  const logger = log.getLogger(namespace);
  return logger;
}

export function getLogHistory() {
  return logHistory;
}
