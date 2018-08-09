const axios = require("axios");
const config = require("../config.json");
const _ = require("lodash");
const { saveJSONToFile } = require("./shared");

token = `token=${config.GROUPME_TOKEN}`;
groupmeGroupsURL = `https://api.groupme.com/v3/groups`;

class Groupme {
  /**
   * Use this function to find the id of your desired group.
   */
  async getGroups() {
    const response = await axios.get(`${groupmeGroupsURL}?${token}`);
    if (response.status == 200) {
      return response.data.response.map(group => {
        return { name, id };
      });
    } else {
      console.error("Network request to Groupme API failed!");
    }
  }

  /**
   * Call this function to get the URLs of the images/videos in your chat
   */
  async getPicURLs(lastMessageId) {
    let getMessagesURL = `${groupmeGroupsURL}/${
      config.GROUP_ID
    }/messages?${token}&limit=100`;

    // Get messages farther back than the last 100 messages
    if (lastMessageId !== undefined)
      getMessagesURL += `&before_id=${lastMessageId}`;

    const response = await axios.get(getMessagesURL);
    if (response.status == 200) {
      const messages = response.data.response.messages;
      const lastId = messages.slice(-1)[0].id;
      const numMessages = messages.length;
      const filteredMessages = messages.reduce((prev, m) => {
        if (m.attachments.length > 0) {
          let imgAttachments = m.attachments.filter(
            a => a.type === "image" || a.type === "video"
          );
          return [...prev, ...imgAttachments];
        } else return prev;
      }, []);
      return {
        filteredMessages,
        lastId,
        numMessages
      };
    } else {
      console.error("Network request to Groupme API failed!");
    }
  }

  /**
   * Caller function to get all picture messages and save them to a JSON file
   */
  async main(fileName) {
    let picUrls = [];
    let { filteredMessages, lastId, numMessages } = await this.getPicURLs();
    try {
      while (true) {
        console.log(filteredMessages);
        for (let m of filteredMessages) picUrls = [m.url, ...picUrls];
        // this will eventually throw when there are no messages left
        let response = await this.getPicURLs(lastId);
        ({ filteredMessages, lastId, numMessages } = response);
      }
    } catch(err) {
      saveJSONToFile(`${__dirname}/../data/${fileName}`, { picUrls });
      console.log(`\nThe status code is: ${err.response.status}`);
      console.log("If the error is a 304 error, everything worked as expected.");
      console.log("If not, then please check the Groupme Developer API status codes.");
    }
  }
}

module.exports = {
  Groupme
};
