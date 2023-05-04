print("try to run server...")
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import langid

import datetime
import threading
import random
import base64
import subprocess
import datetime
import timeit
import time

key = "sn978y695g78y5o9my59p7b5986gv958yp8954vy9s8mbhyv945hy8pbh549yh54s9mh9584mhnm958y7hgytso93xm48g38x94n7ht597nt5v8t"



logined = []

allaccount = [["hingtattsang", "Tsang2007"], ["demoacc", "demoacc"], ["emily6488", "123456"]]

print("imported all data")
app = Flask(__name__)


def encrypt_string(string: str, key: str) -> str:
    key_bytes = key.encode()
    string_bytes = string.encode()
    key_index = 0
    encrypted_bytes = []
    for i in range(len(string_bytes)):
        byte = string_bytes[i] ^ key_bytes[key_index]
        encrypted_bytes.append(byte)
        key_index = (key_index + 1) % len(key_bytes)
    encrypted_bytes = bytes(encrypted_bytes)
    return base64.urlsafe_b64encode(encrypted_bytes).decode()

def decrypt_string(string: str, key: str) -> str:
    key_bytes = key.encode()
    decoded_bytes = base64.urlsafe_b64decode(string.encode())
    decrypted_bytes = []
    key_index = 0
    for i in range(len(decoded_bytes)):
        byte = decoded_bytes[i] ^ key_bytes[key_index]
        decrypted_bytes.append(byte)
        key_index = (key_index + 1) % len(key_bytes)
    decrypted_bytes = bytes(decrypted_bytes)
    return decrypted_bytes.decode()


print("Starting...")


lock = threading.Lock()

print("Started")


app = Flask(__name__)
CORS(app)

# /post?name=gh&email=gfh%40ghf.gh&message=gh&optin=on


def save_text_file(name, email, message):
    # get the current date and time
    now = datetime.datetime.now()
    timestamp = now.strftime("%Y-%m-%d %H:%M:%S")
    
    # create the content string
    content = f"Name: {name}\nEmail: {email}\nMessage: {message}\nTimestamp: {timestamp}"
    
    # save the content to a text file
    with open(f"{name}.txt", "w") as f:
        f.write(content)


@app.route('/submit', methods=['POST'])
def submit():
    # get the values from the request body
    name = request.form.get('name')
    email = request.form.get('email')
    message = request.form.get('message')
    
    # save the message to a text file
    save_text_file(name, email, message)
    print([name, email, message])
    print("sub")
    return '<meta http-equiv="refresh" content="5; URL=http://conders.site/finish">'





@app.route('/ver')
def ver():
    loadalldata()
    rdd = "none"
    print("in, id: " + rdd)
    print("iP: " + str(request.remote_addr))
    print("Loaded... ")

    ans = "ChatCLAI 2023.3.27.2103 23.52TB(ARM64) 我們的目標是讓人工智能系统更自然、更安全地與之交互。"
    
    print("output: " + ans)
    print("end, id: " + rdd)
    
    return ans

@app.route('/get_key')
def get_key():
    name = request.args.get('name', '')
    password = request.args.get('password', '')
    name = str(decrypt_string(name, key))
    password = str(decrypt_string(password, key))

    rdd = random.randint(10000000000000000000000000000000000000000000000000000000000000000000000000000000, 99999999999999999999999999999999999999999999999999999999999999999999999999999999)
    rdd = str(rdd)

    if [name, password] in allaccount:
        print("get_key, id: " + rdd)
        print("iP: " + str(request.remote_addr))
        print("Login...")
        
        if name == "demoacc":
            logined.append([rdd, datetime.datetime.now(), str(request.remote_addr), "noclai"])
        else:
            logined.append([rdd, datetime.datetime.now(), str(request.remote_addr), ""])


        print(name + " login finished.")
        print("output: " + rdd)
        print("end, id: " + rdd)
    else:
        rdd = "Invalid Username or Password."
        print("get_key, id: " + rdd)
        print("iP: " + str(request.remote_addr))
        print("Login error...")
        print("output: " + rdd)
        print("end, id: " + rdd)
    
    return rdd

@app.route('/check_log')
def check_log():    
    with lock:
        rdd = request.args.get('id', '')
        inside = False
        for sublist in logined:
            if rdd in sublist:
                reference_time = sublist[1]
                current_time = datetime.datetime.now()
                time_difference = current_time - reference_time
                if time_difference.total_seconds() < 15 * 60:
                    if str(request.remote_addr) == sublist[2]:
                        inside = True
                    else:
                        inside = False                    
                else:
                    inside = False
        if inside:
            print("check_log, id: " + rdd)
            print("iP: " + str(request.remote_addr))
            print("True")
            print("output: " + rdd)
            print("end, id: " + rdd)
            return "t"
        else:
            rdd = "error"
            print("get_key, id: " + rdd)
            print("iP: " + str(request.remote_addr))
            print("Login error...")
            print("output: " + rdd)
            print("end, id: " + rdd)
            return "f"


@app.route('/logout')
def logout():
    rdd = request.args.get('id', '')
    inside = False
    for sublist in logined:
        if rdd in sublist:
            inside = True
            temp = sublist
    if inside:
        print("get_key, id: " + rdd)
        print("iP: " + str(request.remote_addr))
        print("Logout...")
        logined.remove(sublist)
        print("output: " + rdd)
        print("end, id: " + rdd)
    else:
        rdd = "error"
        print("get_key, id: " + rdd)
        print("iP: " + str(request.remote_addr))
        print("Login error...")
        print("output: " + rdd)
        print("end, id: " + rdd)
    return rdd


@app.route('/python', methods=['POST'])
def run_code():
    with lock:
        rdd = request.form['id']
        print(rdd)
        inside = False
        for sublist in logined:
            if rdd in sublist:
                reference_time = sublist[1]
                current_time = datetime.datetime.now()
                time_difference = current_time - reference_time
                if time_difference.total_seconds() < 15 * 60:
                    inside = True
                else:
                    inside = False
        if inside:
            code = request.form['code']
            result = {'output': '', 'error': '', 'runtime': ''}
            print("get_key, id: " + rdd)
            print("iP: " + str(request.remote_addr))
            print("Python in...")
            start_time = time.time()
            try:
                input_text = request.form['input']
                output = subprocess.check_output(['python3', '-c', code], input=input_text.encode('utf-8'), stderr=subprocess.STDOUT, timeout=10)
                end_time = time.time()
                runtime = end_time - start_time
                result['output'] = '{}<span style="color: gray;"><br><br>Run time: {:.5f}S<br>Your plan: Premium<br>CPU: 4 vCPUs <br>RAM: 8GB</span>'.format(output.decode('utf-8', errors='ignore').replace('\n', '<br>'), runtime)
            except subprocess.CalledProcessError as e:
                end_time = time.time()
                runtime = end_time - start_time
                result['error'] = '{}<span style="color: gray;"><br><br>Run time: {:.5f}S<br>Your plan: Premium<br>CPU: 4 vCPUs <br>RAM: 8GB</span>'.format(e.output.decode('utf-8', errors='ignore').replace('\n', '<br>'), runtime)
            except subprocess.TimeoutExpired:
                end_time = time.time()
                runtime = end_time - start_time
                result['error'] = 'Execution timed out<span style="color: gray;"><br><br>Run time: {:.5f}S<br>Your plan: Premium<br>CPU: 4 vCPUs <br>RAM: 8GB</span>'.format(runtime)
            print("output: " + "result")
            print("end, id: " + rdd)
            return jsonify(result)
        else:
            result = {'output': '', 'error': 'Please login...'}
            rdd = "error"
            print("get_key, id: " + rdd)
            print("iP: " + str(request.remote_addr))
            print("Login error...")
            print("output: " + rdd)
            print("end, id: " + rdd)
            return jsonify(result)

from translate import Translator
@app.route('/translate')
def translate_text():
    text = request.args.get('text', '').strip()
    target_lang = request.args.get('target_lang', '').strip()

    print("translate, id: " + "none")
    print("iP: " + str(request.remote_addr))
    print("input: " + text)
    print("targetLang: " + target_lang)

    if not text or not target_lang:
        return 'Error: both "text" and "target_lang" parameters are required.'

    try:
        translator = Translator(to_lang=target_lang)
        translated_text = translator.translate(text)
        print("output: " + translated_text)
        print("end, id: " + "none")
        return translated_text
    except Exception as e:
        print("end, id: none, error: " + f"{str(e)}")
        return f'Error: {str(e)}'

        
def loadalldata():
    for sublist in logined:
        for i in logined:
            if i in sublist:
                reference_time = sublist[1]
                current_time = datetime.datetime.now()
                time_difference = current_time - reference_time
                if time_difference.total_seconds() < 15 * 60:
                    print("", end="")
                else:
                    logout(i)


if __name__ == '__main__':
    from waitress import serve
    serve(app, port=5000)


