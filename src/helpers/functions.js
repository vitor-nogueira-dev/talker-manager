const { readJsonFile } = require('../files');

const convertDate = (date) => {
  if (date) {
    const [day, month, year] = date.split('/');
    return new Date(`${year}-${month}-${day}`);
  }
};

const filterByMultipleProps = async (name, rate, date) => {
  const talkers = await readJsonFile();
  let filteredTalkers = talkers;
  if (name) {
    filteredTalkers = filteredTalkers.filter((talker) =>
      talker.name.toLowerCase().includes(name.toLowerCase()));
  }
  if (rate) {
    filteredTalkers = filteredTalkers.filter((talker) => talker.talk.rate === rate);
  }
  if (date) {
    filteredTalkers = filteredTalkers
    .filter((talker) => convertDate(talker.talk.watchedAt).toDateString() === date.toDateString());
  }
  return filteredTalkers;
};

const searchMultiple = async (name, rate, date) => {
  const converterDate = convertDate(date);
  return filterByMultipleProps(name, +rate, converterDate);
};

function findById(objectsList, id) {
  return objectsList.find((obj) => obj.id === id);
}

function refactorData(obj) {
  const { talk_watched_at: watchedAt, talk_rate: rate, ...rest } = obj;
  const talk = { watchedAt, rate };
  return { ...rest, talk };
}

module.exports = {
  searchMultiple,
  findById,
  refactorData,
};
