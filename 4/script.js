const chats = [
  {
    createdAt: new Date("2023-10-12T11:30:00Z"),
    contact: {
      id: 1,
      avatarUrl: "https://avatars.githubusercontent.com/u/101023750?s=96&v=4",
      name: "Marcelo Alvarez",
      status: "Online"
    },
    messages: [
      {
        id: 0,
        ownerId: 1,
        ownerName: "Marcelo",
        content: "Tive uma ideia incrível para um projeto! 😍",
        createdAt: new Date("2023-10-12T11:30:00Z")
      },
      {
        id: 1,
        ownerId: 0,
        ownerName: "Você",
        content: "Sério? Me conta mais.",
        createdAt: new Date("2023-10-12T11:32:00Z")
      },
      {
        id: 2,
        ownerId: 1,
        ownerName: "Marcelo",
        content:
          "E se a gente fizesse um chat moderno e responsivo em apenas uma semana?",
        createdAt: new Date("2023-10-12T11:34:00Z")
      },
      {
        id: 3,
        ownerId: 0,
        ownerName: "Você",
        content: "#boraCodar",
        createdAt: new Date("2023-10-12T11:36:00Z")
      }
    ]
  }
];

const actualChat = chats[0];
const actualUserId = 0;

function getContactInfo() {
  const { avatarUrl, name, status } = actualChat.contact;

  const contactAvatar = document.getElementById("contact-avatar");
  const contactName = document.getElementById("contact-name");
  const contactStatus = document.getElementById("contact-status");

  contactAvatar.src = avatarUrl;
  contactName.innerText = name;
  contactStatus.innerText = status;
  contactStatus.setAttribute("data-status", status.toLowerCase());
}

function getMessages() {
  const messages = document.getElementById("messages");

  actualChat.messages.map((i) => messages.append(createMessage(i)));
}

function createMessage(message) {
  const messageContainer = document.createElement("article");
  const messageHeader = document.createElement("h3");
  const messageContent = document.createElement("p");

  messageContainer.classList.add("message");

  messageHeader.innerText = `${message.ownerName} - ${formatTime(
    message.createdAt
  )}`;
  messageHeader.classList.add("message-header");

  messageContent.innerText = message.content;
  messageContent.classList.add("message-content");

  messageContainer.append(messageHeader);
  messageContainer.append(messageContent);
  messageContainer.setAttribute(
    "data-owner",
    message.ownerId === actualUserId ? "own" : "contact"
  );

  return messageContainer;
}

function formatTime(date) {
  const hours = addZeroToTimeBelowTen(date.getHours());
  const minutes = addZeroToTimeBelowTen(date.getMinutes());

  return `${hours}:${minutes}`;
}

function addZeroToTimeBelowTen(time) {
  return time < 10 ? `0${time}` : time;
}

function getMessagesStartDate() {
  const messagesStartDay = document.getElementById("messages-start-date");

  messagesStartDay.innerText = `Hoje ${formatTime(actualChat.createdAt)}`;
}

function sendMessage(event) {
  const sendInput = document.getElementById("send-input");
  const messageContent = sendInput.value;

  if (!messageContent || (event && event.key !== "Enter")) return;

  const lastMessageId = actualChat.messages.at(-1).id;

  const message = {
    id: lastMessageId + 1,
    ownerId: actualUserId,
    ownerName: "Você",
    content: messageContent,
    createdAt: new Date()
  };

  actualChat.messages = [...actualChat.messages, message];

  const messages = document.getElementById("messages");

  messages.append(createMessage(message));

  messages.style.scrollBehavior = 'smooth';
  messages.scrollTop = messages.scrollHeight;

  sendInput.value = "";
}

getContactInfo();
getMessagesStartDate();
getMessages();
