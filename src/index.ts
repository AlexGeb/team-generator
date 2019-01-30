import { people, teamNames } from "./fixtures";

type PeopleType = Set<string>;

type ConfigType = {
  teamNames: Set<string>;
};

type TeamsType = {
  [teamName: string]: Set<string>;
};

const shuffle = (array: any[]) => {
  let m = array.length,
    t,
    i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
};

const generateTeams = (
  people: PeopleType,
  config: ConfigType | undefined
): TeamsType => {
  const { teamNames } = config;
  if (!teamNames || teamNames.size <= 0) return {};
  let teams: TeamsType = [...teamNames].reduce(
    (teams: TeamsType, name) => ({ ...teams, [name]: new Set() }),
    {}
  );
  const shuffledPeople = new Set(shuffle([...people]));
  while (shuffledPeople.size > 0) {
    teams = [...teamNames].reduce((teams: TeamsType, name) => {
      if (shuffledPeople.size > 0) {
        const personToAdd = [...shuffledPeople][0];
        shuffledPeople.delete(personToAdd);
        return { ...teams, [name]: teams[name].add(personToAdd) };
      }
      return teams;
    }, teams);
  }
  return teams;
};

export default generateTeams;
