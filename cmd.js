const commander = require("commander");
const { countryCodes } = require("./constants.js");

const program = new commander.Command();

const checkCountryCode = (value) => {
    if (!countryCodes.includes(String(value).toLowerCase())) {
        throw new commander.InvalidArgumentError("Apple store is not available for the given country code.");
    }
        
    return String(value).toLowerCase();
};

const checkZipCode = (value) => {
    if (!value) {
        throw new commander.InvalidArgumentError("Invalid zip code!");
    }

    return value;
}

program
    .name("node index.js")
    .description("Verifying Product Availability for In-Store Pickup.")
    .version("1.0.0");

program
    .requiredOption("-C, --country <string>", "ISO code for country (2 character). Ex. us", checkCountryCode)
    .requiredOption("-P, --partNumbers <string...>", " Space separated part numbers of your interested products. Ex. MTQV3LL/A MTQQ3LL/A")
    .requiredOption("-Z, --zip <string>", "ZIP code to search for. Ex. 75035", checkZipCode)
    .option("-T, --time <number>", "Time in milliseconds to refresh. Defaults to non recurring mode.", 0)
    .option("-N, --ntfy <string>", "ntfy url for notification. Ex. https://ntfy.sh/*******", "")
    .option("-S, --storeNumber <string>", "Store number to check specifically. Ex. R746", "")
    .parse();

const options = program.opts();

module.exports = { options };