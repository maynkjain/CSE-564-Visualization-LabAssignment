import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt
from scipy.spatial.distance import cdist
from sklearn.cluster import KMeans
from flask import Flask
from flask import request, jsonify
from kneed import KneeLocator

fields = ['OVA','Pace','Finishing','Shot','Age','Height','Pass','Defend','Physical','Goalkeeping','Penalties','Crossing','Dribbling']

df = pd.read_csv('data.csv',usecols = fields) 
#print(df.head())


scaler = StandardScaler()
scaledDF = scaler.fit_transform(df)

#print(scaledDF)

pca = PCA()
pca.fit(scaledDF)

eigenVector = pca.components_
#print(eigenVector.shape)
loadings = pd.DataFrame(eigenVector.T,columns=['PC1','PC2','PC3','PC4','PC5','PC6','PC7','PC8','PC9','PC10','PC11','PC12','PC13'], index=df.columns)
#print(loadings)

scaledPCA = pca.transform(scaledDF)

pc1 = scaledPCA[:,0]
pc2 = scaledPCA[:,1]


VariancePercentValues = pca.explained_variance_ratio_*100


screePlotjsonVal = []
cumulativeSum = 0;
pcNumber = 1
for val in VariancePercentValues:
    temp = {}
    cumulativeSum += val
    temp["xval"] = "PC" + str(pcNumber)
    pcNumber += 1
    temp["yval"] = val
    temp["cumulative"] = cumulativeSum
    screePlotjsonVal.append(temp)
    
    
    
loadingValues = loadings.values.tolist()
n = len(loadingValues)
loadingAttribute = loadings.index.tolist()    

pca1and2json = {}
pca1and2json["pc1"] = pc1.tolist()
pca1and2json["pc2"] = pc2.tolist()

biPlotLine = []
for i in range(n):
    biplotpoints = {}
    biplotpoints["attr"] = loadingAttribute[i]
    biplotpoints["x"] = loadingValues[i][0]
    biplotpoints["y"] =loadingValues[i][1]
    biPlotLine.append(biplotpoints)

pca1and2json["biPlotLine"] = biPlotLine


# K Means calculation
k = range(1,14)
clusters = [KMeans(n_clusters = c, init = 'k-means++').fit(df) for c in k ]
clusterCentres = [cc.cluster_centers_ for cc in clusters]


k_distance = [cdist(df, cent, 'euclidean') for cent in clusterCentres]
distances = [np.min(kd, axis=1) for kd in k_distance]
avg = [np.sum(dist) / df.shape[0] for dist in distances]
kn = KneeLocator(k, avg, curve='convex', direction='decreasing')
kneeValue = kn.knee
#print(kn.knee)

kmeans_pca = KMeans(n_clusters = kneeValue, init ='k-means++')
kmeans_pca.fit(scaledPCA)
kMeansClusters = kmeans_pca.labels_
#print(len(kMeansClusters))
#print(kMeansClusters)


df["ColorCluster"] = kMeansClusters
df.to_csv("new_data.csv",index = False)


def getSquaredList(n):
    sqObj = []
    dimensionalityIndex = n
    totalVariables = 13
    SquaredList = np.zeros(totalVariables)
    i = 0
    for i in  range(totalVariables):
        sqjson = {}
        for j in range(dimensionalityIndex):
            SquaredList[i] += loadingValues[i][j]**2
            
            
        round_off_values = np.around(SquaredList, decimals = 5) 
        sqjson["Attribute"] = loadingAttribute[i]
        sqjson["Value"] = round_off_values[i]
        sqObj.append(sqjson)
    
    sorted_obj = dict(sqObj) 
    sorted_obj = sorted(sqObj, key=lambda x : x['Value'], reverse=True)
    
    return sorted_obj[:4]


def pca():
    return screePlotjsonVal

def pca1and2():
    return pca1and2json
    

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return "Hello!!"

@app.route('/getpca', methods=['GET'])
def getpca():
    response = jsonify(pca())
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/getpca1and2', methods=['GET'])
def getpca1and2():
    response = jsonify(pca1and2())
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/getScatterPlotmatrixValues', methods=['GET'])
def getScatterPlotmatrixValues():
    response = jsonify(getSquaredList(int(request.args.get("di"))))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    app.run(debug=True)


