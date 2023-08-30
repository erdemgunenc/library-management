import * as Bunyan from "bunyan";
import * as fs from "fs";

const log = Bunyan.createLogger({
  name: "LibraryManagement",
  serializers: Bunyan.stdSerializers,
  streams: [
    {
      level: "info",
      stream: fs.createWriteStream("logs/info.log", { flags: "a" }),
    },
    {
      level: "error",
      stream: fs.createWriteStream("logs/error.log", { flags: "a" }),
    },
  ],
});

export function LogService(method: string, url: string): void {
  const logMessage = { method, url, timestamp: new Date().toISOString() };
  log.info(logMessage, "Incoming request");
}
