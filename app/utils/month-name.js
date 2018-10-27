const DATABASE = {
  0: 'Январь',
  1: 'Февраль',
  2: 'Март',
  3: 'Апрель',
  4: 'Май',
  5: 'Июнь',
  6: 'Июль',
  7: 'Август',
  8: 'Сентябрь',
  9: 'Октябрь',
  10: 'Ноябрь',
  11: 'Декабрь',
};

const mod = function(n, d) {
  return n > 0 ? n % d : d + (n % d);
};

export default function monthName(monthNumber = new Date().getMonth()) {
  if (monthNumber < 0) {
    monthNumber = mod(new Date().getMonth() + monthNumber, 12);
  }

  return DATABASE[monthNumber];
}
