const { URL } = require("./constants.js");
const term = require("terminal-kit").terminal;
const say = require('say')
var player = require('play-sound')(opts = {})
let speechID = null;

const exitProcess = (code = 0) => {
    term.processExit(code);
    process.exit(code);
};

const validator = (options) => {
    let { time, country, partNumbers, zip } = options;
    time = Number(time);
    country = String(country).toLowerCase();
    partNumbers = (partNumbers || []).map((partNumber) => String(partNumber).toUpperCase());
    zip = String(zip);

    try {
        if (options.time < 60000 && options.time > 0 || options.time < 0) {
            throw new Error("Time should be greater than or equal to 1 minute.");
        }
        if (!options.time) {
            throw new Error("Invalid time!");
        }
        if (!country || country.length > 2) {
            throw new Error("Invalid country code!");
        }
        if (!partNumbers || partNumbers.length < 1) {
            throw new Error("Invalid part number provided!");
        }
        if (!zip || zip.length < 5) {
            throw new Error("Invalid zip code!");
        }
        (partNumbers || []).forEach(partNumber => {
            if (!partNumber.includes("/")) {
                throw new Error(`Invalid part number detected: ${partNumber}`);
            }
        });

        if (options.ntfy) {
            let url = String(options.ntfy).startsWith("ntfy.sh") ? `https://${options.ntfy}` : String(options.ntfy);

            options.ntfy = url;
        }

        options.time = time;
        options.country = country;
        options.partNumbers = partNumbers;
        options.zip = zip;
    } catch (error) {
        term.red(error.message);
        exitProcess();
    }
};

const generateURLs = (partNumbers, country, zip) => {
    return partNumbers.map((partNumber) => {
        let url = URL.replace("COUNTRY", country);
        url = url.replace("PARTNUMBER", partNumber);
        url = url.replace("LOCATION", zip);

        return url;
    });
};

function notify() {
    return new Promise((resolve) => {
        if (!speechID) {
            player.play('notification.mp3', function (err) {
                speechID = null;
                if (!err) {
                    say.speak('Product available!', "Samantha", 1.0, (err) => {
                        resolve();
                    });
                }
            });
        }
    })
}

const sendNotification = async (url, message) => {

    notify()
        .then(async () => {
            if (url) {
                await fetch(url, {
                    method: "POST",
                    body: message
                });
            }

        })
};

module.exports = {
    validator,
    generateURLs,
    sendNotification
};