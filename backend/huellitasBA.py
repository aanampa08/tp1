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
    Foto = db.Column(db.String(1000),nullable=False)
    Descripcion = db.Column(db.Text,nullable=False)
    Contacto = db.Column(db.String(255),nullable=False)
    barrioID=db.Column(db.Integer,db.ForeignKey('Barrio.idBarrio'),nullable=False)
    tipoAnimalID=db.Column(db.Integer,db.ForeignKey('tipoAnimal.idTipoAnimal'),nullable=False)

class Adopcion(db.Model):
    __tablename__='Adopcion'
    idAdopcion = db.Column(db.Integer, primary_key=True,autoincrement=True)
    usuarioID=db.Column(db.Integer,db.ForeignKey('Usuario.idUsuario'),nullable=False)
    animalID=db.Column(db.Integer,db.ForeignKey('Animal.idAnimal'),nullable=False)
    Nombre = db.Column(db.String(255),nullable=False)
    Edad =  db.Column(db.Integer,nullable=False)
    Profesion = db.Column(db.String(255),nullable=False)
    Telefono =  db.Column(db.String(225),nullable=False)
    Email = db.Column(db.String(255),nullable=False)
    Direccion =db.Column(db.String(225),nullable=False)
    Localidad = db.Column(db.String(255),nullable=False)
    Motivo = db.Column(db.Text,nullable=False)
    tipoVivienda = db.Column(db.Text,nullable=False)
    Exteriores = db.Column(db.Text,nullable=False)
    Consenso = db.Column(db.Text,nullable=False)
    Alergias = db.Column(db.Text,nullable=False)
    Costos = db.Column(db.Text,nullable=False)
    Adaptacion = db.Column(db.Text,nullable=False)
    Compatibilidad = db.Column(db.Text,nullable=False)
    regaloMascota = db.Column(db.Text,nullable=False)

class Usuario(db.Model):
    __tablename__='Usuario'
    idUsuario = db.Column(db.Integer, primary_key=True,autoincrement=True)
    Nombre = db.Column(db.String(255),nullable=False)
    nombreUsuario = db.Column(db.String(255),nullable=False)
    Contraseña = db.Column(db.String(255),nullable=False)
    Email = db.Column(db.String(255))
    Telefono = db.Column(db.String(255))

class tipoAnimal(db.Model):
    __tablename__='tipoAnimal'
    idTipoAnimal = db.Column(db.Integer, primary_key=True,autoincrement=True)
    Tipo = db.Column(db.String(255),nullable=False)
