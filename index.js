const axios = require("axios");
const config = require("./config.json");

const token = `token=${config.GROUPME_TOKEN}`;
const groupmeGroupsURL = `https://api.groupme.com/v3/groups`;

/**
 * Use this function to find the id of your desired group.
 */
const getGroups = async () => {
  const response = await axios.get(`${groupmeGroupsURL}?${token}`);
  if (response.status == 200) {
    const data = response.data;
    const groups = data.response.map(group => {
      const { name, id } = group;
      return { name, id };
    });
    console.log(groups);
  } else {
    console.error("Network request to Groupme API failed!");
  }
};

/**
 * Call this function to get the URLs of the images in your chat
 */
const getPicURLs = async (lastMessageId = "") => {
  const getMessagesURL = `${groupmeGroupsURL}/${config.GROUP_ID}/messages?${token}&limit=100&${lastMessageId}`;
  const response = await axios.get(getMessagesURL);
  if (response.status == 200) {
    const currLastMessage = response.data.response.messages.slice(-1)[0].id;
    const messages = response.data.response.messages
      .filter(message => message.attachments.length !== 0)
      .map(message => message.attachments);
    return { messages, last_id: currLastMessage };
  } else {
    console.error("Network request to Groupme API failed!");
  }
};

const main = async () => {
  const messages = await getPicURLs();
  console.log(messages);
};

// main();
getGroups()