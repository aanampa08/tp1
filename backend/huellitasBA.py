#Librerias
from flask_sqlalchemy import SQLAlchemy 

#Instanciamos el constructor para uso de sus atributos
db = SQLAlchemy()

#Creamos las tablas necesarias
class Barrio(db.Model):
    __tablename__='Barrio'
    idBarrio = db.Column(db.Integer, primary_key=True,autoincrement=True)
    Nombre = db.Column(db.String(255),nullable=False)

class Sexo(db.Model):
    __tablename__='Sexo'
    idSexo = db.Column(db.Integer, primary_key=True,autoincrement=True)
    Nombre = db.Column(db.String(255),nullable=False)

class Animal(db.Model):
    __tablename__='Animal'
    idAnimal = db.Column(db.Integer, primary_key=True,autoincrement=True)
    Nombre = db.Column(db.String(255),nullable=False)
    Edad = db.Column(db.Integer,nullable=False)
    tipoEdad=db.Column(db.String(255),nullable=False)
    sexoID=db.Column(db.Integer,db.ForeignKey('Sexo.idSexo'),nullable=False)
    Foto = db.Column(db.String(255),nullable=False)
    Descripcion = db.Column(db.Text,nullable=False)
    Contacto = db.Column(db.String(255),nullable=False)
    barrioID=db.Column(db.Integer,db.ForeignKey('Barrio.idBarrio'),nullable=False)
