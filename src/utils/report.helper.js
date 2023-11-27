import moment from 'moment';

export const groupCountValueByDate = (data) => {
  const result = {};
  data.forEach((item) => {
    const date = moment(item.time).format('YYYY-MM-DD');
    if (result[date]) {
      result[date] += 1;
    } else {
      result[date] = 1;
    }
  });
  return result;
};
