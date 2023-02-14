import { Sequelize } from "sequelize";
import config from "../config";
import { httpResponse } from "../config/http";
import logger from "../utils/logger";

const { host, username, password, database, dialect } =
  config[process.env.NODE_ENV || "development"];

const db = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
  logging: logger.debug.bind(logger),
});

const connectionCheck = () => {
  return db
    .authenticate()
    .then(() => logger.info("Database Connected Successfully!"))
    .catch((err) => logger.error(err.original));
};

const dbTransaction = () => {
  const transaction = db.transaction();

  return transaction;
};

const updateOrCreate = async (model, where, payload, transaction = null) => {
  const result = await model.findOne({ where }).then((data) => {
    if (data) return data.update(payload, { transaction });

    return model.create(payload, { transaction });
  });

  return result;
};

const paginate = (data, current_page = 1, limit = 10) => {
  const total_records = data.length;
  const total_page = Math.ceil(total_records / limit);

  let records = BaseRepository.jsonParse(data);
  records = records.slice((current_page - 1) * limit, current_page * limit);

  return {
    current_page: Number(current_page),
    total_page,
    total_records,
    records,
  };
};

const findOrFail = async (model, where, transaction = null) => {
  const result = await model
    .findAll({ where }, { transaction })
    .then((data) => {
      if (!data) throw new httpResponse("Record not found", 404);

      return data;
    })
    .catch((err) => {
      throw new httpResponse(err.message, err.status);
    });

  return result;
};

export {
  db,
  connectionCheck,
  dbTransaction,
  updateOrCreate,
  paginate,
  findOrFail,
};
