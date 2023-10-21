from flask import Flask, render_template, request, session, redirect, url_for
import sqlite3
import hashlib
from flask import Flask, render_template, request, session, redirect, url_for


app = Flask(__name__, static_folder='static')
app.secret_key = "your_secret_key"  # Change this to a secure secret key

def username_exists(username):
    conn = sqlite3.connect("userdata.db")
    cur = conn.cursor()
    cur.execute("SELECT * FROM userdata WHERE username=?", (username,))
    result = cur.fetchone()
    conn.close()
    return result is not None   

@app.route('/login', methods=['GET', 'POST'])
def login_page():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        password = hashlib.sha256(password.encode()).hexdigest()
        session['username'] = username

        conn = sqlite3.connect("userdata.db")
        cur = conn.cursor()

        cur.execute("SELECT * FROM userdata WHERE username = ? AND password = ?", (username, password))

        user_data = cur.fetchone()
        if user_data:
            # return "Login successful! Welcome, {} back to ZenTasks".format(username)
            return "Login successful!"
            #We need to redirect to main.html from here
        else:
            return "Login failed. User Not Found or incorrect password."

    return render_template('login.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup_page():
    if request.method == 'POST':
        new_username = request.form['username']
        new_password = request.form['password']
        new_password = hashlib.sha256(new_password.encode()).hexdigest()

        session['username'] = new_username

        conn = sqlite3.connect("userdata.db")
        cur = conn.cursor()

        if username_exists(new_username):
            return "Username already exists. Please choose a different username."

        else:
            cur.execute("INSERT INTO userdata(username, password) VALUES (?, ?)", (new_username, new_password))
            conn.commit()
            return "Login successful!"
        #We need to redirect to main.html from here
        
    return render_template('signup.html')

@app.route('/dashboard')
def main():
    username = session.get('username')
    # If you're using a different way to store the username, adjust accordingly
    return render_template('dashboard.html', username=username)


if __name__ == '__main__':
    app.run(debug=True, port=9999)
