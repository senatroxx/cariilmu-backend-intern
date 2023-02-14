import logger from "../../utils/logger";
import { urlFormatter } from "../../config/http";

const handleError = (req, res, next) => {
  const endpoint = urlFormatter(req);

  logger.info({ message: req.method, meta: { url: endpoint, ip: req.ip } });

  next();
};

export default handleError;
