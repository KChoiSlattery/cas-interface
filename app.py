from flask import Flask, render_template, request, send_from_directory
import simplejson as json

from latex2sympy.latex2sympy import process_sympy
import sympy as sp

app = Flask(__name__,
            template_folder="dist/templates",
            static_folder="dist/static")

# The following two functions are necessary to get the site to load the pages and files properly.
@app.route("/", methods=['GET', 'POST'] ) 
def home_page():
   return render_template('index.html')

@app.route("/solver", methods=['GET', 'POST'] ) 
def solver_page():
   return render_template('solver.html')

@app.route('/static/<path:path>')
def send_report(path):
    return send_from_directory('static', path)
 
# The next function is just an example for how to call python from javascript.
@app.route("/get_free_symbols",methods=['GET', 'POST'])
def get_free_symbols():
    try:
        latex = request.json['latex']
        
        expression = process_sympy(latex)
        # expression = sp.sympify("Equality(Pow(Symbol('v', real=True, positive=True), Integer(2)), Mul(Symbol('mu', real=True, positive=True), Add(Mul(Integer(2), Pow(Symbol('r', real=True, positive=True), Integer(-1))), Mul(Integer(-1), Integer(1), Pow(Symbol('a', real=True, positive=True), Integer(-1))))))")
        free_symbols = expression.free_symbols
        
        return json.dumps({
            "free_symbols": [sp.latex(element) for element in free_symbols],
            "error_msg": ""
        })
    except Exception as error:
        return json.dumps({
            "free_symbols": 0,
            "error_msg": repr(error)
        })