from flask import Flask, render_template, request, session, redirect, url_for
import sqlite3
import hashlib
from flask import Flask, render_template, request, session, redirect, url_for, jsonify

app = Flask(__name__, static_folder='static')
app.secret_key = "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"  # Change this to a secure secret key

chatbot_responses = {
    "hello": "Hello! How can I assist you?",
    "how are you": "I'm just a chatbot, but I'm here to help.",
    "bye": "Goodbye! Feel free to return if you have more questions.",
    "write an essay on frisco high school with 100 words": "Frisco High School in Texas epitomizes academic excellence and community engagement. With a dynamic faculty and cutting-edge resources, the school prioritizes rigorous academics, fostering an inclusive environment that celebrates diversity. Beyond the classroom, Frisco High School excels in sports and the arts, promoting a holistic approach to student development. The school's commitment to community involvement, through partnerships and service learning, cultivates responsible and engaged citizens. Frisco High School, with its blend of academic prowess, extracurricular vibrancy, and community focus, stands as a model institution, preparing students not just for success in their studies but for impactful contributions to society."
}

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
            user_id = user_data[0]
            #We need to redirect to main.html from here
        else:
            return "Login failed. User Not Found or incorrect password."

    return render_template('login.html')

@app.route('/dashboard/zenai')
def zenai_page():
    username = session.get('username')
    if username is None or username == "Guest":
        return redirect(url_for('login_page'))
    else:
        return render_template('chatgpt.html', username=username)

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
        
        if (new_username=="" or new_password==""):
            return "Username or Password is empty."
        
        if(len(new_username)<6 or len(new_password)<6):
            return "Username and Password must be atleast 6 characters!"
        
        # if(new_username.find(" ") or new_password.find(" ")):
        #     return "Username and Password cannot contain space!"

        else:
            cur.execute("INSERT INTO userdata(username, password) VALUES (?, ?)", (new_username, new_password))
            conn.commit()

            # Get the user_id of the newly created user
            cur.execute("SELECT id FROM userdata WHERE username=?", (new_username,))
            user_id = cur.fetchone()[0]

            return "Login successful!"
        #We need to redirect to main.html from here
        
    return render_template('signup.html')

@app.route('/dashboard')
def dashboard():
    username = session.get('username')
    if username == "Guest":
        return render_template('dashboard.html', username="Guest")
    if username is None:
        return redirect(url_for('login_page'))
    return render_template('dashboard.html', username=username)

@app.route('/dashboard-guest')
def dashboard__guest():
    username = session.get('username')
    if username !=None or username != "Guest":
        username = session.get('username')
        # return redirect(url_for('dashboard'))
        return render_template('dashboard.html', username="Guest")
    
    return render_template('dashboard.html', username=username)

@app.route('/')
def landing_page():
    return render_template('landing.html')

@app.route('/dashboard/todo')
def todo_page():
    username = session.get('username')
    if username is None or username == "Guest":
        return redirect(url_for('login_page'))
    else:
        return render_template('todo.html', username=username)

@app.route('/dashboard/chatgpt')
def chatgpt_page():
    username = session.get('username')
    if username is None or username == "Guest":
        return redirect(url_for('login_page'))
    else:
        return render_template('chatgpt.html', username=username)


@app.route('/logout')
def logout():
    # Clear the session to log out the user
    session.clear()
    return redirect(url_for('landing_page'))

@app.route('/dashboard/profile')
def profile_page():
    username = session.get('username')
    if username is None or username == "Guest":
        return redirect(url_for('login_page'))
    else:
        return render_template('profile.html', username=username)
    
# @app.route('/dashboard/calendar')
# def calendar_page():
#     username = session.get('username')
#     if username is None or username == "Guest":
#         return redirect(url_for('login_page'))
#     else:
#         return render_template('Calendar.html', username=username)
    

@app.route('/chatbot', methods=['POST'])
def chatbot():
    user_message = request.json.get('message').lower()
    chatbot_response = chatbot_responses.get(user_message, "I don't understand that. Can you please rephrase?")

    return jsonify({'response': chatbot_response})

@app.route('/calendar')
def calendar_page():
    return render_template('Calendar_2.html')

@app.route('/calendar_2')
def calendar_2_page():
    return render_template('Calendar.html')
    
@app.route('/todo')
def todo2_page():
    return render_template('todo_2.html')

@app.route('/dashbaord/time')
def time_page():
    return render_template('time.html')

if __name__ == '__main__':
    app.run(debug=True, port=9999)