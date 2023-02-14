import moment from "moment";

function getDefaultFormat() {
  return moment().format();
}

function getWithFormat(format) {
  return moment().format(format);
}

function datetimeLog() {
  return getWithFormat("DD MMM YYYY HH:mm:ss");
}

export { getDefaultFormat, getWithFormat, datetimeLog };
