from flask import Flask, render_template, request, session, redirect
import sqlite3
import hashlib

app = Flask(__name__, static_folder='static')
app.secret_key = "your_secret_key"  # Change this to a secure secret key

@app.route('/login', methods=['GET', 'POST'])
def login_page():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        password = hashlib.sha256(password.encode()).hexdigest()

        conn = sqlite3.connect("userdata.db")
        cur = conn.cursor()

        cur.execute("SELECT * FROM userdata WHERE username = ? AND password = ?", (username, password))

        user_data = cur.fetchone()
        if user_data:
            return "Login successful! Welcome, {} back to ZenTasks".format(username)
        else:
            return "Login failed. User Not Found or incorrect password."

    return render_template('login.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup_page():
    if request.method == 'POST':
        new_username = request.form['username']
        new_password = request.form['password']
        new_password = hashlib.sha256(new_password.encode()).hexdigest()

        conn = sqlite3.connect("userdata.db")
        cur = conn.cursor()

        cur.execute("INSERT INTO userdata(username, password) VALUES (?, ?)", (new_username, new_password))
        conn.commit()

        return "Signup successful! Welcome, {} to ZenTasks".format(new_username)

    return render_template('signup.html')

@app.route('/main')
def main():
    return render_template('main.html')

if __name__ == '__main__':
    app.run(debug=True, port=9999)
