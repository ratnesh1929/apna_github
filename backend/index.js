const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const { Initrepo } = require("./controllers/init");
const { addFile } = require("./controllers/add");
const { commitRepo } = require("./controllers/commit");
const { pullRepo } = require("./controllers/pull");
const { pushRepo } = require("./controllers/push");
const { revertRepo } = require("./controllers/revert");

yargs(hideBin(process.argv))
  .command("init", "Initialize a new Repository", {}, Initrepo)
  .command(
    "add <file>",
    "Add a file to the repository",
    (yargs) => {
      yargs.positional("file", {
        describe: "File to be added",
        type: "string",
      });
    },
    (argv) => {
      addFile(argv.file);
    }
  )
  .command(
    "commit <message>",
    "Commit changes to the repository",
    (yargs) => {
      yargs.positional("message", {
        describe: "Commit message",
        type: "string",
      });
    },
    (argv) => {
      commitRepo(argv.message);
    }
  )

  .command("push", "Push commit form s3", {}, pushRepo)
  .command("pull", "Pull commit form s3", {}, pullRepo)
  .command(
    "revert <commitId>",
    "Revert to a specific commit",
    (yargs) => {
      yargs.positional("commitId", {
        describe: "Commit ID to revert to",
        type: "string",
      });
    },
    revertRepo
  )

  .demandCommand(1, "You need at least one command before moving on")
  .help().argv;
