import { UAParser } from "ua-parser-js";
import geoip from "geoip-lite";

export const extractSessionDetails = (req, res, next) => {
  // 1. Capture and normalize IP address
  let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";

  if (ip === "::1" || ip === "::ffff:127.0.0.1") {
    ip = "127.0.0.1";
  }

  // 2. Parse User-Agent for Device Name
  const parser = new UAParser(req.headers["user-agent"]);
  const uaResult = parser.getResult();

  let deviceName = "Terminal/Script Platform";
  if (uaResult.browser.name || uaResult.os.name) {
    deviceName = `${uaResult.browser.name || "Unknown Browser"} on ${uaResult.os.name || "Unknown OS"}`;
  }

  // 3. Look up physical location
  let location = "Unknown Location";
  if (ip !== "127.0.0.1") {
    const geo = geoip.lookup(ip);
    if (geo) {
      location = `${geo.city || "Unknown City"}, ${geo.region || "Unknown Region"} \nLat/Long${geo.ll || ""}\n${geo.timezone || "Unknown timezone"} ${geo.country}`;
    }
  } else {
    location = "Localhost Development Server";
  }

  // 4. Set custom variables directly on the req object
  req.clientIp = ip;
  req.device = deviceName;
  req.location = location;

  next();
};
