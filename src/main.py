from flask import Flask, render_template, request, jsonify, redirect, url_for, make_response
import requests
# from notification_backend import trigger_notification

app = Flask(__name__)


app.secret_key = 'your_secret_key'

# ඞඞඞඞඞඞඞඞඞඞඞඞඞඞඞ
def authenticate_user(username, password):
    api_url = f"https://friscoisdhacapi.vercel.app/api/info?username={username}&password={password}"
    response = requests.get(api_url)

    if response.status_code == 200:
        return response.json()
    else:
        return None

@app.route('/', methods=['GET', 'POST'])
def login():
    dark_mode = request.cookies.get('dark_mode') == 'true'
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        user_info = authenticate_user(username, password)

        if user_info:
            
            return redirect('https://bossman7309.net')
        else:
            return "Authentication failed. Please check your credentials."

    return render_template('login.html', dark_mode=dark_mode)

@app.route('/toggle-dark-mode', methods=['POST'])
def toggle_dark_mode():
    response = make_response('Dark mode preference updated')
    dark_mode = request.form.get('dark_mode')
    response.set_cookie('dark_mode', dark_mode)
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)

