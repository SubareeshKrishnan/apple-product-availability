# Apple Store Product Availability Monitor
- This application will get data from Apple's website to check product availability and notify you when the desired product becomes available.
### How to run:
- Install all the dependencies.
- Execute the tool using `node index.js [options]`.
> [!IMPORTANT]
> To ensure proper functionality, please make sure that you have Node.js version 18 or a higher version installed. It's uncertain whether the application will work correctly with versions below that.
### Options:
- `country`<sup>*</sup> - ISO code for country (2 character). Ex. us. **(Required)**
- `partNumbers`<sup>*</sup> - Space separated part numbers of your interested products. Ex. MTQV3LL/A MTQQ3LL/A. **(Required)**
- `zip`<sup>*</sup> - ZIP code to search for. Ex. 75035. **(Required)**
- `time` - Time in milliseconds to refresh. Defaults to non recurring mode. **(Optional)**
- `ntfy` - ntfy url for notification. Ex. https://ntfy.sh/*******. **(Optional)**
- `storeNumber` - Store number to check specifically. Ex. R746. **(Optional)**
### Enabling ntfy service:
- Install the ntfy app and create a new topic for your notifications. Choose a unique topic name, something like "my-secret-apple-alerts" and subscribe to it.
### Example:
- `node index.js -C us -P MTQQ3LL/A MTQV3LL/A -Z 75035 -N ntfy.sh/apple-store-**** -T 60000 -S R746`
### Acknowledgments

I would like to express my heartfelt thanks to anyone who finds value in this project. Your interest and potential contributions mean a lot to me. While I'm the sole developer at the moment, I welcome collaboration and feedback from the community.

Thank you for considering this project, and I hope it proves useful to you!
