const fs = require("fs");
const { exec } = require("child_process");

// first time
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
      update(true);
   });
};

// move to autumnblaze if arent there already
const movedirs = () => {
   if (!process.cwd().endsWith("autumnblaze")) try {
      process.chdir("./autumnblaze");
   } catch (err) {
      return false;
   }
   return true;
};

// update the repo and npm install
const update = (e = false) => {
   // if e is true, its called from install lol
   // if its false, its an update
   // quite strange ik
   if (!movedirs()) {
      if (e) console.warn("failed to install: could not switch working directory");
      else console.warn("failed to update: could not switch working directory");
      return;
   }
   if (!e) {
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
         console.log(stdo);
         npminstall(e);
      });
   } else npminstall(e);
};

// install npm dependencies
const npminstall = (e) => {
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
      if (!e) console.log("update success");
   });
};
// see if the directory already exists
// if it does, assuming already cloned and npm installed
module.exports = () => {
   if (!fs.existsSync("./autumnblaze")) {
      console.log("==================== FIRST TIME INSTALLING ====================");
      console.log("\n=============== HAIIIIII WELCOME TO MY THING LOL ==============");
      install();
   } else update();
};
