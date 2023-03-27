import { ILeaderboardMatch, ILeaderboardHome } from '../interface/ILeaderboard';

const Name = (team: ILeaderboardMatch) => {
  const { name } = team;
  return name;
};

const TotalVictories = (team: ILeaderboardMatch, i: number) => {
  let totalVictories = 0;
  team.match.forEach((t) => {
    if (t.homeTeam === i + 1 && t.homeTeamGoals > t.awayTeamGoals) totalVictories += 1;
  });
  return totalVictories;
};

const TotalDraws = (team: ILeaderboardMatch, i: number) => {
  let totalDraws = 0;
  team.match.forEach((t) => {
    if (t.homeTeam === i + 1 && t.homeTeamGoals === t.awayTeamGoals) totalDraws += 1;
  });
  return totalDraws;
};

const TotalLosses = (team: ILeaderboardMatch, i: number) => {
  let totalLosses = 0;
  team.match.forEach((t) => {
    if (t.homeTeam === i + 1 && t.homeTeamGoals < t.awayTeamGoals) totalLosses += 1;
  });
  return totalLosses;
};

const TotalPoints = (team: ILeaderboardMatch, i: number) => {
  let totalPoints = 0;
  team.match.forEach((t) => {
    if (t.homeTeam === i + 1 && t.homeTeamGoals > t.awayTeamGoals) totalPoints += 3;
    if (t.homeTeam === i + 1 && t.homeTeamGoals === t.awayTeamGoals) totalPoints += 1;
  });
  return totalPoints;
};

const GoalsFavor = (team: ILeaderboardMatch, i: number) => {
  let goalsFavor = 0;
  team.match.forEach((t) => {
    if (t.homeTeam === i + 1) goalsFavor += t.homeTeamGoals;
  });
  return goalsFavor;
};

const GoalsOwn = (team: ILeaderboardMatch, i: number) => {
  let goalsOwn = 0;
  team.match.forEach((t) => {
    if (t.homeTeam === i + 1) goalsOwn += t.awayTeamGoals;
  });
  return goalsOwn;
};

const GoalsBalance = (team: ILeaderboardMatch, i: number) => {
  let goalsBalance = 0;
  team.match.forEach((t) => {
    if (t.homeTeam === i + 1) goalsBalance += t.homeTeamGoals - t.awayTeamGoals;
  });
  return goalsBalance;
};

const Efficiency = (totalPoints: number, totalGames: number) => {
  const efficiency = (totalPoints / (totalGames * 3)) * 100;
  return efficiency.toFixed(2);
};

const sortTableTeams = (leaderboard: ILeaderboardHome[]) => (
  leaderboard.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn)
);

const rankingTeam = (scoreboard: ILeaderboardMatch[]) => {
  const leaderboard = scoreboard.map((team, i) => {
    const name = Name(team);
    const totalPoints = TotalPoints(team, i);
    const totalGames = team.match.length;
    const totalVictories = TotalVictories(team, i);
    const totalDraws = TotalDraws(team, i);
    const totalLosses = TotalLosses(team, i);
    const goalsFavor = GoalsFavor(team, i);
    const goalsBalance = GoalsBalance(team, i);
    const goalsOwn = GoalsOwn(team, i);
    const efficiency = Efficiency(totalPoints, totalGames);

    const firstPartTable = { name, totalPoints, totalGames, totalVictories, totalDraws };
    const secondPartTable = { totalLosses, goalsFavor, goalsBalance, goalsOwn, efficiency };

    return { ...firstPartTable, ...secondPartTable };
  });
  return sortTableTeams(leaderboard);
};

export default rankingTeam;
