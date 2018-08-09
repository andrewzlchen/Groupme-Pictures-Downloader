const { Groupme } = require("../app/groupme.js");

const main = async subcommand => {
  const GM = new Groupme()
  switch (subcommand) {
    case "run":
      console.log("Doing the run subcommand");
      break;
    case "get":
      console.log("Getting groups based on supplied Groupme API key...");
      const groups = await GM.getGroups()
      console.log(groups);
      break;
    default:
      console.log("Not a valid subcommand!");
  }
};

module.exports = {
  main
};
