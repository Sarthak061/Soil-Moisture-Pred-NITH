a machine-learning model that can predict soil moisture levels based on time series data.

A detailed Report can be found <a href = 'https://docs.google.com/document/d/1A7p_0JeeiBUQQXa80Rd8c4A7a6hutTEJWeLkbi-Mq4o/edit?usp=sharing'> here </a>

WE are team defiance and we created an hybrid machine learning model to predict the soil moisture levels of any particular location. Our primary approach for preprocessing data was to find out the parameters for SARIMAX model to get the seasonality in data. for the same - We melted the soil moisture levels while taking the pm3 variable and it's values. to improve the model's predictive performance we also calculated the first, second and third difference of the moisture levels and used them for a comparative study.

we then decomposed the time series into 3 components and we applied the Loess decomposition using the STL class from the statsmodels package, specifically on a subset of the data spanning 8 months. The data was then checked for stationarity - if it's stationary or not. and the auto correlation and partial auto correlation values were plotted. 

One the SARIMAX model was taken care of, to predict the values of soil moisture - we deployed an imputed RFR Pipeline. The model was then exported and sliced using pickle slicer into 4 smaller divisions- each of which had a different weight, and size.

an even more accurate determination was made by using the ADFuller (ADF) test and the model was evaluated after fitting the values in it. The models were tested upon various values of P, Q, D, and M for getting the optimal values and accuracy.

## Further work is being done on it so that the user is allowed to pick the parameters to use while predicting and all other parameters for the model on his own. 

Team - Defiance
Team Members - 
1. Sarthak Sharma(Leader)
2. Divyansh Kumar
3. Naman Nagvanshi
