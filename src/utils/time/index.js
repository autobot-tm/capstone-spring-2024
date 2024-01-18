import moment from 'moment';

export const isTimeExpired = (date, bufferTime) => {
  const now = new Date();
  const dateToCompare = moment(date).add(bufferTime, 'milliseconds').toDate();
  return now > dateToCompare;
};
