const fs = require("fs").promises;
const path = require("path");

async function addFile(filepath) {
  const repoPath = path.resolve(process.cwd(), ".apnaGit");
  const staggingPath = path.join(repoPath, "staging");

  try {
    await fs.mkdir(staggingPath, { recursive: true });
    const fileName = path.basename(filepath);
    await fs.copyFile(filepath, path.join(staggingPath, fileName));
    console.log(`File ${fileName} added to staging area.`);
  } catch (err) {
    console.error("Error adding file:", err.message);
  }
}

module.exports = {
  addFile,
};
