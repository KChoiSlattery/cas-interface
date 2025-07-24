from flask import Flask, render_template, request, send_from_directory
import simplejson as json

app = Flask(__name__,
            template_folder="dist/templates",
            static_folder="dist/static")


# The following two functions are necessary to get the site to load the pages and files properly.
@app.route("/", methods=['GET', 'POST'] ) 
def home():
   return render_template('index.html')

@app.route('/static/<path:path>')
def send_report(path):
    return send_from_directory('static', path)
 
# The next function is just an example for how to call python from javascript.
@app.route("/python_sum",methods=['GET', 'POST'])
def python_sum():
    try:
        a = request.json['a']
        b = request.json['b']
        print("Successfully called python_sum()")
        output = a + b
        
        return json.dumps({
            "output": output,
            "error_msg": ""
        })
    except Exception as error:
        return json.dumps({
            "output": 0,
            "error_msg": repr(error)
        })