const fs=require('fs').promises;
const path=require('path');

async function Initrepo() {
    const repoPath=path.resolve(process.cwd(),".apnaGit");
    const commitPath=path.join(repoPath,"commits");

    try{
        await fs.mkdir(repoPath,{recursive:true});
        await fs.mkdir(commitPath,{recursive:true});
        await fs.writeFile(
            path.join(repoPath,"config.json"), 
            JSON.stringify({bucket:process.env.S3_BUCKET || "my-default-bucket"},null,2)
        );
        console.log("Initialized empty ApnaGit repository in",repoPath);

    }catch(err){
        console.error("Error initializing repository:",err.message);
    }


}



module.exports = {
    Initrepo
};