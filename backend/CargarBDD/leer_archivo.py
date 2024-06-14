'''
IMPORTANTE:
. Correr directamente desde la terminal
. Tener instalado python3 para poder ejecutarlo: python3 leer_archivo.py
. Tener instalado pandas,pip : pip install pandas
'''
#Libreria
import pandas as pd 

#Leemos el archivo que contiene a los animales
animales= pd.read_csv("animales.csv")

# recorremos el dataFrame que contiene  a los animales.
# cantidad de registros es dada por .shape[0]
for i in range(animales.shape[0]):
    print(f"id: {animales['ID'][i]} nombre: {animales['Nombre'][i]} sexo: {animales['Sexo'][i]} edad: {animales['Edad'][i],animales['Tipo Edad'][i]} zona:{animales['Zona'][i]} descripcion: {animales['Descripcion'][i]}")   
