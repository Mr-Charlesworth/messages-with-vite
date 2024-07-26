import './style.css'
import axios from 'axios'

document.querySelector('#app').innerHTML = `
    <h1>Messages</h1>
    <form id="message-form">
        <label for="from-input">From</label>
        <input type="text" name="from" id="from-input">
        <label for="from-input">Message</label>
        <input type="text" name="message" id="message-input">
        <input type="submit">
    </form>
    <div id="message-list"></div>
`;

const updateMessages = (messages) => {
  console.log(messages)
  const html = messages.map((m) => `
    <p>From ${m.from}</p>
    <p>Message: ${m.message}</p>
    <hr>
  `).join("\n");
  const messageList = document.getElementById('message-list');
  messageList.innerHTML = html;
}

const getMessages = () => axios.get('http://localhost:3001/api/messages')
  .then(({ data }) => updateMessages(data))

const form = document.getElementById('message-form');

form.onsubmit = (e) => {
  e.preventDefault();
  axios({
    method: 'POST',
    url: 'http://localhost:3001/api/messages',
    data: {
      from: form.elements["from"].value,
      message: form.elements["message"].value
    },
  }).then(() => getMessages())
};

getMessages();