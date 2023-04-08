import flask
from flask import Flask, render_template, request
import pickle
import numpy as np
import warnings
warnings.filterwarnings('ignore')

app = Flask(__name__)
model3 = pickle.load(open('model3.pkl', 'rb'))
model4 = pickle.load(open('model4.pkl', 'rb'))

@app.route('/', methods=['GET'])
def index():
  return render_template('index.html')

@app.route('/index1')
def index1():
  return render_template('index1.html')

@app.route('/index2')
def index2():
  return render_template('index2.html')

@app.route('/index3')
def index3():
  return render_template('index3.html')

@app.route('/index1', methods=['GET', "POST"])
def predict_s1():
  input_values = [float(x) for x in request.form.values()]
  inp_features = [input_values]
  prediction = model3.predict(inp_features)
  return render_template('index1.html',output='Predicted soil moisture is :{}'.format(prediction))

@app.route('/index2', methods=['GET', "POST"])
def predict_s2():
  input_values1 = [float(y) for y in request.form.values()]
  inp_features1 = [input_values1]
  prediction1 = model4.predict(inp_features)
  return render_template('index2.html',output='Predicted soil moisture is :{}'.format(prediction1))


app.run()