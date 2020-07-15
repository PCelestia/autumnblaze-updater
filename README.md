## autumnblaze-updater
a very hacky thing that every so often checks for updates to autumnblaze using `git fetch`, and updates using `git pull` and `npm install` when you say so.

you can view my plans and things for the bot at [my trello board thing](https://trello.com/b/6o7eZylC/autumnblaze-bot).

## requirements
- `node.js` and `npm` required. tested and working on `npm 6.14.5` and `node v14.4.0`, but `12.18.2 LTS` and `14.5.0 Current` (as well as all future "current" and "LTS" versions) should work.
- `git` required (unless i make a non-git version). tested and working on `git version 2.23.0.windows.1`.
## very basic use
**important notes:**
- this doesnt fully work yet
- read this whole section fully first before doing anything to prevent messing it up
1. head over to the [readme at the autumnblaze bot repo](https://github.com/pcelestia/autumnblaze#readme) and follow [the instructions](https://github.com/pcelestia/autumnblaze#very-basic-use) to setup a node project.
2. where it says to `npm install pcelestia/autumnblaze`, **do `npm install pcelestia/autumnblaze-updater`**
3. where it says to "stick this inside `index.js`", put this instead.
```js
require("autumnblaze")({
   token: "your_bot_token",
   mongodbconnectionstring: "your_mongodb_connection_string"
}).start();
```
(replace `connect()` with `start()`)
4. you can put all configuration options shown in the [detailed readme of the bot](https://github.com/PCelestia/autumnblaze/blob/main/DETAILED-README.md) inside the object in the same way as the nonupdater version
4. everything else should be exactly the same.

## other stuffs
- more config options available soonish
- previous version of the bot and current version of the bot (used in [L&T Discord Server](https://love-tolerance.com/discord)) does not use this updater thing and never will
- my hosted bot *may* be opened to public use in the future (probably not though, since i dont have money lol), and if it is, it won't use this updater
