df = pd.read_csv('fifa21_male2_cleaned_csv.csv') 
row_value = df["Value"].shape[0]

for i in range(row_value):
  if df["Value"][i][-1] == "M":
    df["Value"][i] = int(float(df["Value"][i][:-1]))*1000000
  elif df["Value"][i][-1] == "K":
    df["Value"][i] = int(float(df["Value"][i][:-1])*1000)
  df["Value"][i] = int(float(df["Value"][i]))

row_wage = df["Wage"].shape[0]
for i in range(row_wage):
  if df["Wage"][i][-1] == "M":
    df["Wage"][i] = int(float(df["Wage"][i][:-1]))*1000000
  elif df["Wage"][i][-1] == "K":
    df["Wage"][i] = int(float(df["Wage"][i][:-1])*1000)
  df["Wage"][i] = int(float(df["Wage"][i]))

row_weight = df["Weight"].shape[0]
for i in range(row_weight):
  df["Weight"][i] = df["Weight"][i][:-3]

row_height = df["Height"].shape[0]
temp = df["Height"][i].split("-")

for i in range(row_height):
   feet_inch = df["Height"][i].split("-")
   df["Height"][i] = float(feet_inch[0]) + float(float(feet_inch[1])/(12))
   df["Height"][i] = round(df["Height"][i],2)


df.to_csv('data.csv')

#df1 = pd.read_csv('data.csv') 