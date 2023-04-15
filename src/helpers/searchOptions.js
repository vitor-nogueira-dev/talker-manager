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
    action: (q, rate) => searchByNameAndRate(q, +rate),
  },
  {
    search: (q, _rate, date) => q && date,
    action: (q, date) => filterByNameAndDate(q, date),
  },
  {
    search: (q, _rate, _date) => q || q === '',
    action: (q) => searchByName(q),
  },
  {
    search: (_q, rate, _date) => rate,
    action: (rate) => searchByRate(+rate),
  },
  {
    search: (_q, _rate, date) => date,
    action: (date) => searchByDate(date),
  },
];
