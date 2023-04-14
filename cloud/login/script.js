// login id
let rdd = "000000";
const key = "sn978y695g78y5o9my59p7b5986gv958yp8954vy9s8mbhyv945hy8pbh549yh54s9mh9584mhnm958y7hgytso93xm48g38x94n7ht597nt5v8t";

// url var
let currentURL = "http://" + (new URL(window.location.href).hostname).toString().replace("ai", "server");
currentURL = currentURL.replace(/\/$/, "");

const params = new URLSearchParams(window.location.search);
const appname = params.get('redirect'); 

if (appname === "aichat") {
  document.title = "Login to ChatCLAI";
};
if (appname === "python") {
  document.title = "Login to Python ide";
};

// body var
var modal = document.getElementById('id01');
const loginButton = document.querySelector('#llg');
const usernameInput = document.querySelector('input[name="uname"]');
const passwordInput = document.querySelector('input[name="psw"]');

// run at apper
usernameInput.focus();
const logintext = document.getElementById('logintext');
loginButton.addEventListener('click', () => {
  let username = usernameInput.value;
  let password = passwordInput.value;
  password = encryptString(password, key);
  username = encryptString(username, key);
  login(username, password);
  
});


modal.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    document.getElementById('llg').click();
  }
});




// function
function login(name, password) {
  const url =  currentURL + ':5000/get_key';
  const params = new URLSearchParams({
    name: name,
    password: password
  });

  fetch(`${url}?${params}`)
    .then(response => response.text())
    .then(data => {
      console.log(data);
      if (data === 'Invalid Username or Password.') {
        rdd = '000000';
        logintext.innerText = data;
      } else {
        rdd = data;
        if (Number.isInteger(parseInt(data)) === true) {
          if (appname === "aichat") {
            window.location.replace(currentURL + "/cloud/ai" + "?id=" + rdd);
          };
          if (appname === "python") {
            window.location.replace(currentURL + "/cloud/python" + "?id=" + rdd);
          };
          if (appname === "home") {
            window.location.replace(currentURL + "/cloud/home" + "?id=" + rdd);
          };
        } else {
          data = "Server error."
        };

      };


    })
    .catch(error => console.error(error));
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

