import moment from "moment";

const eventStatus = (date) => {
  const currentDate = moment(new Date());
  const eventDate = moment(date);
  return eventDate >= currentDate ? "Up-coming" : "completed";
};

export default eventStatus;
