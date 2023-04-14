// login id
const params = new URLSearchParams(window.location.search);
const rdd = params.get('id');
if (rdd === null) {
  window.location.href = "/cloud/login?redirect=home";
}
const key = "sn978y695g78y5o9my59p7b5986gv958yp8954vy9s8mbhyv945hy8pbh549yh54s9mh9584mhnm958y7hgytso93xm48g38x94n7ht597nt5v8t";

// url var
let currentURL = "http://server." + (new URL(window.location.href).hostname).toString().replace("ai", "server");
currentURL = currentURL.replace(/\/$/, "");

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
        window.location.href = "/cloud/login?redirect=home";
      }
    })
    .catch(error => {
      window.location.href = "/cloud/login?redirect=home";
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
      window.location.replace("/cloud/login?redirect=home");
    })
    .catch(error => console.error(error));
}


redirectToUrl("chatclai", "/cloud/ai" + "?id=" + rdd);
redirectToUrl("python", "/cloud/python" + "?id=" + rdd);
redirectToUrl("vm", "/cloud/home" + "?id=" + rdd);

function redirectToUrl(id, url) {
  document.getElementById(id).onclick = function() {
    window.location.href = url;
  }
}
