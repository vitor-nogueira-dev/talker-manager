const {
  searchByName,
  searchByRate,
  searchByDate,
  searchByNameAndRate,
  searchMultiple,
  filterByNameAndDate,
} = require('./functions');

module.exports = [
  {
    search: (q, rate, date) => q && rate && date,
    action: (q, rate, date) => searchMultiple(q, rate, date),
  },
  {
    search: (q, rate, _date) => q && rate,
    action: (q, rate, date) => searchByNameAndRate(q, +rate, date),
  },
  {
    search: (q, _rate, date) => q && date,
    action: (q, rate, date) => filterByNameAndDate(q, rate, date),
  },
  {
    search: (q, _rate, _date) => q || q === '',
    action: (q, rate, date) => searchByName(q, rate, date),
  },
  {
    search: (q, rate, _date) => rate,
    action: (q, rate, date) => searchByRate(q, rate, date),
  },
  {
    search: (_q, _rate, date) => date,
    action: (q, rate, date) => searchByDate(q, rate, date),
  },
];
