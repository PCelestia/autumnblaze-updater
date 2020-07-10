const fs = require("fs");
const { exec } = require("child_process");

// or update
const install = () => {
   console.log("==================== GIT CLONEING ====================");
   exec("git clone https://github.com/PCelestia/autumnblaze.git", (err, stdo, stde) => {
      if (err) {
         console.warn("error: " + err);
         return;
      }
      if (stde) {
         console.warn("asdf");
         console.warn("stderror: " + stde);
      }
      console.log("==================== GIT CLONE OUTPUT ====================");
      console.log(stdo);
      update();
   });
};
const update = () => {
   if (!process.cwd().endsWith("autumnblaze")) try {
      process.chdir("./autumnblaze");
   } catch (err) {
      console.warn("failed to update: could not switch working directory");
      return;
   }
   console.log("==================== GIT PULLING ====================");
   exec("git pull", (err, stdo, stde) => {
      if (err) {
         console.warn("==================== ERROR ====================\n" + err);
         return;
      }
      if (stde) {
         console.warn("==================== STDERROR ====================\n" + stde);
      }
      console.log("==================== GIT PULL OUTPUT ====================");
      console.log(stdo)
      console.log("==================== NPM INSTALLING ====================");
      exec("npm install", (err, stdo, stde) => {
         if (err) {
            console.warn("==================== ERROR ====================\n" + err);
            return;
         }
         if (stde) {
            console.warn("==================== STDERROR ====================\n" + stde);
         }
         console.log("==================== NPM INSTALL OUTPUT ====================");
         console.log(stdo);
      });
   });
};

try {
   fs.access("./autumnblaze");
} catch (err) {
   // likely cause not installed yet
   console.log("==================== FIRST TIME INSTALLING ====================");
   install();
}
