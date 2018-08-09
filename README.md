# GroupMe Pictures Downloader

Hi! This is a script to help you to rapidly download your images from GroupMe instead of manually downloading the images one-by-one.

Currently, this project needs to be run via `node` by each file, but hopefully in the future I can make a proper cli, and perhaps a desktop application with `electron`

If you'd like to contribute, please feel free to submit a PR!

## Installation

1. Clone this repository

`git clone https://github.com/xChenny/Groupme-Pictures-Downloader.git`

2. Install npm packages

`npm install`

3. Get a Groupme API token from their developer site
4. Add your token to the `config.json` file
5. Run the Groupme.getGroups function located in the `src/groupme.js` file to get the ID of the chat that you wish to get the pictures from
6. Paste the chat's id into the `config.json` file.
7. Run the Groupme.main function to get the URL of all the images in the chat
8. Download the images by running the `local.js` file with node
