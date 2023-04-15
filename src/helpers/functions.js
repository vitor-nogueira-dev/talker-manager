const { readJsonFile } = require('../files');

const searchByName = async (name) => {
  const talkers = await readJsonFile();
  return talkers.filter((talker) =>
    talker.name.toLowerCase().includes(name.toLowerCase())
  );
};

const searchByRate = async (rating) => {
  const talkers = await readJsonFile();
  return talkers.filter(({ talk }) => talk.rate === rating);
};

const convertDate = (date) => {
  const [day, month, year] = date.split('/');
  return new Date(`${year}-${month}-${day}`);
};

const searchByDate = async (date) => {
  const talkers = await readJsonFile();
  const filteredTalkers = talkers.filter(({ talk }) => {
    const searchDate = convertDate(date);
    const watchedDate = convertDate(talk.watchedAt);
    return (
      watchedDate.getDate() === searchDate.getDate() &&
      watchedDate.getMonth() === searchDate.getMonth() &&
      watchedDate.getFullYear() === searchDate.getFullYear()
    );
  });
  return filteredTalkers;
};

const searchByNameAndRate = async (name, rate) => {
  const talkers = await readJsonFile();
  return talkers.filter(
    (talker) =>
      talker.name.toLowerCase().includes(name.toLowerCase()) &&
      talker.talk.rate === rate
  );
};

const filterByMultipleProps = async (name, rate, date) => {
  const talkers = await readJsonFile();

  const filteredByName = talkers.filter((talker) =>
    talker.name.toLowerCase().includes(name.toLowerCase())
  );

  const filteredByRate = talkers.filter(({ talk }) => talk.rate === rate);

  const filteredByWatchedAt = talkers.filter(
    ({ talk }) =>
      convertDate(talk.watchedAt).toDateString() === date.toDateString()
  );

  const filteredArrays = [filteredByName, filteredByRate, filteredByWatchedAt];
  const result = filteredArrays.reduce((acc, curr) =>
    acc.filter((obj) => curr.includes(obj))
  );

  return result;
};

const searchMultiple = async (name, rate, date) => {
  const converterDate = convertDate(date);
  return filterByMultipleProps(name, +rate, converterDate);
};

const filterByNameAndDate = async (name, date) => {
  const talkers = await readJsonFile();
  const convertedDate = convertDate(date);

  const filteredByName = talkers.filter((talker) =>
    talker.name.toLowerCase().includes(name.toLowerCase())
  );

  const filteredByWatchedAt = talkers.filter(
    ({ talk }) =>
      convertDate(talk.watchedAt).toDateString() ===
      convertedDate.toDateString()
  );

  const result = filteredByName.filter((talker) =>
    filteredByWatchedAt.includes(talker)
  );

  return result;
};

function findById(objectsList, id) {
  return objectsList.find((obj) => obj.id === id);
}

function refactorData(obj) {
  const { talk_watched_at, talk_rate, ...rest } = obj;
  const talk = { watchedAt: talk_watched_at, rate: talk_rate };
  return { ...rest, talk };
}

module.exports = {
  searchByName,
  searchByRate,
  searchByDate,
  searchByNameAndRate,
  searchMultiple,
  filterByNameAndDate,
  findById,
  refactorData,
};
