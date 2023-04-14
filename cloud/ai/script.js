// login id
const params = new URLSearchParams(window.location.search);
const rdd = params.get('id');
if (rdd === null) {
  window.location.href = "/cloud/login?redirect=aichat";
}
const key = "sn978y695g78y5o9my59p7b5986gv958yp8954vy9s8mbhyv945hy8pbh549yh54s9mh9584mhnm958y7hgytso93xm48g38x94n7ht597nt5v8t";

// url var
let currentURL = "http://" + (new URL(window.location.href).hostname).toString().replace("ai", "server");
currentURL = currentURL.replace(/\/$/, "");

// body var
var chatHistory = []; // Create an empty array to store chat history
chatHistory = getArrayFromCookie("key");
updateUI(chatHistory);
const chatArea = document.querySelector('.chat-area');
const chatInput = document.querySelector('.chat-input input');
const chatButton = document.querySelector('.chat-input button');
const sendButton = document.getElementById('sendButton');
const clearButton = document.querySelector('#clear-button');
const logoutButton = document.querySelector('#logout');

// run at apper
checklog(rdd);
const url = currentURL + ':5000/ver';
const responseTextElement = document.getElementById('response-text');
fetch(url)
  .then(response => response.text())
  .then(text => {
    responseTextElement.innerText = text;
  })
  .catch(error => {
    responseTextElement.innerText = 'Error: ' + error.message;
  });



sendButton.addEventListener('click', () => {
  sendMessage();
});

logoutButton.addEventListener('click', () => {
  logout(rdd);
});


chatInput.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    sendMessage();
  }
});


clearButton.addEventListener('click', () => {
  chatInput.value = '';
  const chatMessages = document.querySelectorAll('.chat-message');
  chatMessages.forEach(chatMessage => {
    chatMessage.remove();
  });
  chatHistory = [];
  saveArrayToCookie("key", chatHistory);
});




// function
function checklog(id) {
  const url =  currentURL + ':5000/check_log';
  const params = new URLSearchParams({
    id: id
  });

  fetch(`${url}?${params}`)
    .then(response => response.text())
    .then(data => {
      if (data === "t") {
        
      } else {
        window.location.href = "/cloud/login?redirect=aichat";
      }
    })
    .catch(error => {
      window.location.href = "/cloud/login?redirect=aichat";
    });
}

function logout(id) {
  const url =  currentURL + ':5000/logout';
  const params = new URLSearchParams({
    id: id
  });

  fetch(`${url}?${params}`)
    .then(response => response.text())
    .then(data => {
      console.log(data);
      window.location.replace("/cloud/login?redirect=aichat");
    })
    .catch(error => console.error(error));
}


function sendMessage() {
  const message = chatInput.value.trim();
  if (message === '') {
    return;
  }
  
  let temp1 = message;
  
  const originalText = temp1;

  const chatMessage = document.createElement('div');
  chatMessage.classList.add('chat-message');
  chatMessage.classList.add('me');
  chatMessage.innerText = "You: " + temp1;
  chatArea.appendChild(chatMessage);
  
  // Add user message to chat history array
  chatHistory.push(chatMessage.innerText);
  
  let messageold = message;
  chatInput.value = '';
  chatArea.scrollTop = chatArea.scrollHeight;
  AIsendMessage(messageold);
  saveArrayToCookie("key", chatHistory)
}

function AIsendMessage(messageold) {
  let temp = messageold.toLowerCase();
  var aa = "";
  aa = "Sorry, I don't know. can you ask me in anther way ? ";
  const chatHistoryString = chatHistory[chatHistory.length - 1];

  let userInput = chatHistoryString;

  const endpoint = currentURL + ":5000/chat_ai?s=" + encodeURIComponent(userInput + " AI: ") + "&id=" + rdd;

  let messageaa = "Loading...";
  let chatMessage = document.createElement('div');
  chatMessage.classList.add('chat-message');
  chatMessage.classList.add('other');
  chatMessage.innerText = "AI: " + messageaa.replace("ChatCLAI:", "").replace("User:", "");
  chatArea.appendChild(chatMessage);

  // Add AI message to chat history array
  chatHistory.push(chatMessage.innerText);  

  chatInput.value = '';
  chatArea.scrollTop = chatArea.scrollHeight;


  fetch(endpoint)
    .then(response => response.text())
    .then(async data => {
      console.log(data);
      aa = await data;

      const chatArea = document.querySelector('.chat-area');
      // Remove last message
      const lastMessage = chatArea.lastElementChild;
      if (lastMessage) {
        lastMessage.remove();
      }
      
      const message = aa;
      const chatMessage = document.createElement('div');
      chatMessage.classList.add('chat-message');
      chatMessage.classList.add('other');
      chatMessage.innerText = "AI: " + message.replace("ChatCLAI:", "").replace("User:", "");
      chatArea.appendChild(chatMessage);
    
      // Add AI message to chat history array
      chatHistory.push(chatMessage.innerText);
    
      chatInput.value = '';
      chatArea.scrollTop = chatArea.scrollHeight;
      if (aa === "Please login...") {
        window.location.href = "/cloud/login?redirect=aichat";
      } else {
        saveArrayToCookie("key", chatHistory)
      }
      saveArrayToCookie("key", chatHistory)
    })
    .catch(error => {
      console.error(error);
      
    });
}


function encryptString(string, key) {
  const keyBytes = new TextEncoder().encode(key);
  const stringBytes = new TextEncoder().encode(string);
  let keyIndex = 0;
  const encryptedBytes = [];
  for (let i = 0; i < stringBytes.length; i++) {
    const byte = stringBytes[i] ^ keyBytes[keyIndex];
    encryptedBytes.push(byte);
    keyIndex = (keyIndex + 1) % keyBytes.length;
  }
  const encryptedArray = new Uint8Array(encryptedBytes);
  const encryptedString = btoa(String.fromCharCode(...encryptedArray));
  return encryptedString;
}

function decryptString(string, key) {
  const keyBytes = new TextEncoder().encode(key);
  const decodedBytes = new Uint8Array(Array.from(atob(string), c => c.charCodeAt(0)));
  const decryptedBytes = [];
  let keyIndex = 0;
  for (let i = 0; i < decodedBytes.length; i++) {
    const byte = decodedBytes[i] ^ keyBytes[keyIndex];
    decryptedBytes.push(byte);
    keyIndex = (keyIndex + 1) % keyBytes.length;
  }
  const decryptedArray = new Uint8Array(decryptedBytes);
  const decryptedString = new TextDecoder().decode(decryptedArray);
  return decryptedString;
}

function saveArrayToCookie(key, array) {
  document.cookie = `${key}=${JSON.stringify(removeAFromArray(array))}`;
}

function getArrayFromCookie(key) {
  try {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${key}=`))
      ?.split('=')[1];
    return JSON.parse(cookieValue);
  } catch (error) {
    return [];
  }
}

function updateUI(chatHistory) {
  const chatArea = document.querySelector('.chat-area');

  for (let i = 0; i < chatHistory.length; i++) {
    const chatMessage = document.createElement('div');
    chatMessage.classList.add('chat-message');

    if (chatHistory[i].startsWith('You:')) {
      chatMessage.classList.add('me');
    } else {
      chatMessage.classList.add('other');
    }

    chatMessage.innerText = chatHistory[i];
    chatArea.appendChild(chatMessage);
  }
}


function removeAFromArray(arr) {
  return arr.filter(function(element) {
    return element !== "AI: Loading...";
  });
}
