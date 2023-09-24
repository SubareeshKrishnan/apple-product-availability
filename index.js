const { options } = require("./cmd.js");
const { validator, generateURLs } = require("./utils.js");
const { main } = require("./app.js");

validator(options);
const urls = generateURLs(options.partNumbers, options.country, options.zip);

const checkAvailability = async () => {
    for (let i = 0; i < urls.length; i++) {
        await main(urls[i], options.storeNumber, options.ntfy);
    }
};

if (options.time === 0) {
    checkAvailability();
} else {
    setInterval(() => {
        checkAvailability();
    }, options.time)
}
