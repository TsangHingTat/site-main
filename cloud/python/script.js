// login id
const params = new URLSearchParams(window.location.search);
const rdd = params.get('id');
if (rdd === null) {
  window.location.href = "/cloud/login?redirect=python";
}
const key = "sn978y695g78y5o9my59p7b5986gv958yp8954vy9s8mbhyv945hy8pbh549yh54s9mh9584mhnm958y7hgytso93xm48g38x94n7ht597nt5v8t";

// url var
let currentURL = "http://server." + (new URL(window.location.href).hostname).toString().replace("ai", "server");
currentURL = currentURL.replace(/\/$/, "");

// run at apper
checklog(rdd);
const logoutButton = document.querySelector('#logout');
logoutButton.addEventListener('click', () => {
  logout(rdd);
});


var editor = CodeMirror(document.getElementById("editor"), {
  mode: "python",
  theme: "dracula",
  lineNumbers: true,
  autofocus: true
});
editor.setSize(null, "auto");


var savedContent = Cookies.get("editorContent");
if (savedContent) {
  editor.setValue(savedContent);
} else {
  editor.setValue("\n\n\n\n\n\n\n\n\n");
}


editor.on("change", function() {
  let content = editor.getValue();
  Cookies.set("editorContent", content);
});



var outputEl = document.getElementById("output");
var errorEl = document.getElementById("error");

var outputcard = document.getElementById("outputcard");
var errorcard = document.getElementById("errorcard");


errorcard.style.display = 'none';

document.getElementById("upl-btn").addEventListener("click", function() {
  uploadFileToEditor()
});
document.getElementById("dow-btn").addEventListener("click", function() {
  downloadEditorContent()
});


document.getElementById("run-btn").addEventListener("click", function() {
  var code = editor.getValue();
  var input = document.getElementById("input-field").value;
  outputEl.innerHTML = '';
  errorEl.innerHTML = '';
  fetch(currentURL + ':5000/python', {
    method: 'POST',
    body: new URLSearchParams({
      'id': rdd,
      'code': code,
      'input': input
    })
  })
  .then(response => response.json())
  .then(result => {
    if (result.output) {
      outputcard.style.display = 'block';
      errorcard.style.display = 'none';
      outputEl.innerHTML = result.output;
    } else if (result.error) {
      errorcard.style.display = 'block';
      outputcard.style.display = 'none';
      errorEl.innerHTML = result.error;
    }
  })
  .catch(error => {
    errorcard.style.display = 'block';
    outputcard.style.display = 'none';
    errorEl.innerHTML = 'An error occurred: ' + error.message;
  });
});

function uploadFileToEditor() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.py'; // file types that can be uploaded
  input.onchange = e => { 
    const file = e.target.files[0]; 
    const reader = new FileReader();
    reader.readAsText(file,'UTF-8');
    reader.onload = readerEvent => {
      const content = readerEvent.target.result;
      editor.setValue(content);
    }
  };
  input.click();
}

function downloadEditorContent() {
  const filename = 'code.py';
  const content = editor.getValue();
  const blob = new Blob([content], {type: 'text/plain'});
  const link = document.createElement('a');
  link.download = filename;
  link.href = window.URL.createObjectURL(blob);
  link.onclick = () => {
    setTimeout(() => {
      window.URL.revokeObjectURL(link.href);
    }, 500);
  };
  link.click();
}




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
        window.location.href = "/cloud/login?redirect=python";
      }
    })
    .catch(error => {
      window.location.href = "/cloud/login?redirect=python";
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
      window.location.replace(currentURL + "/cloud/login?redirect=python");
    })
    .catch(error => console.error(error));
}

