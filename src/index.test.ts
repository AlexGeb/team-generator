import { expect } from "chai";
import teamGenerator from "./index";
import { people, teamNames } from "./fixtures";

describe("teamGenerator function", () => {
  it("should return an empty object if teamNames is empty", () => {
    const result = teamGenerator(people, {
      teamNames: new Set([])
    });
    expect(result).to.deep.equal({});
  });

  it("should return the right number of teams", () => {
    const result = teamGenerator(people, {
      teamNames
    });
    expect(Object.keys(result)).to.have.lengthOf(teamNames.size);
  });

  it("should not have teams with more members than the number of people divided by the number of teams", () => {
    const result = teamGenerator(people, {
      teamNames
    });
    for (const teamName in result) {
      expect([...result[teamName]]).to.not.have.length.above(
        people.size / teamNames.size + 1
      );
    }
  });

  it("should give one team with all the people if only one team name is given", () => {
    const result = teamGenerator(people, {
      teamNames: new Set(["black"])
    });
    expect(result["black"]).to.deep.equal(people);
  });

  it("all the people should have been placed in the teams", () => {
    const result = teamGenerator(people, {
      teamNames
    });
    const peopleFromTeams = [];
    for (const teamName in result) {
      peopleFromTeams.push(...[...result[teamName]]);
    }
    expect(peopleFromTeams.sort()).to.deep.equal([...people].sort());
  });
});
