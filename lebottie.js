"use strict";
// const fs = require("fs");
const { execSync } = require("child_process");

// first time
const install = () => {
   console.log("==================== INSTALLING ====================");
   console.log("==================== GIT CLONEING ====================");
   try {
      const stdo = execSync("git clone https://github.com/PCelestia/autumnblaze.git").toString();
      console.log(stdo);
   } catch (err) {
      console.warn("==================== ERROR ====================\n" + err);
      return false;
   }
   return update(true);
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

// update repo (pull) and npm install
const update = (e = false) => {
   // if e is true, its called from install lol
   // if its false, its an update
   // quite strange ik
   if (!e) console.log("==================== UPDATING ====================");
   if (!movedirs()) {
      if (e) console.warn("failed to install: could not switch working directory");
      else console.warn("failed to update: could not switch working directory");
      return false;
   }

   if (!e) {
      // update, git pull
      console.log("==================== GIT PULLING ====================");
      try {
         const stdo = execSync("git pull").toString();
         if (!stdo.startsWith("Already up to date.")) {
            console.log(stdo);
         } else {
            console.log("==================== ALREADY UP TO DATE ====================");
            return true;
         }
      } catch (err) {
         console.warn("==================== ERROR ====================\n" + err);
         return false;
      }
   }
   // npm install no matter what
   // unless no git changes, which then its already returned by now
   npminstall();
   if (!e) console.log("==================== UPDATE SUCCESS ====================\n");
};

const npminstall = () => {
   console.log("==================== NPM INSTALLING ====================");
   try {
      const stdo = execSync("npm install").toString();
      console.log(stdo);
   } catch (err) {
      console.warn("==================== ERROR ====================\n" + err);
      return false;
   }
   return true;
};

// clear requires cache
const clearrequires = () => {
   for (const requirethingie in require.cache) {
      delete require.cache[requirethingie];
   }
};

// install();
// update();
const defaultopts = {
   autoupdate: true,
   checkinterval: 7200000, // in millis, default check once per two hours
   updateonstartup: true,
   updateonshutdown: false // NOT RECOMMENDED
};

const updater = (autumnblazeopts, updateropts = defaultopts) => {
   var patchedupdateropts = JSON.parse(JSON.stringify(defaultopts));
   for (const key in updateropts) patchedupdateropts[key] = updateropts[key];
   updater.opts = patchedupdateropts;
   updater.autumnblazeopts = autumnblazeopts;
   return updater;
};

updater.defaultopts = defaultopts;
updater.botrunning = false;

updater.start = () => {
   updater.botrunning = true;
   updater.autumnblaze = require("./autumnblaze")(updater.autumnblazeopts).connect();
   return updater;
};

updater.update = () => {
   if (updater.botrunning) {
      updater.autumnblaze.stop();
      updater.botrunning = false;
   }
   clearrequires();
   update();
};
updater.restartandupdate = () => {
   updater.update();
   updater.start();
};

module.exports = updater;
