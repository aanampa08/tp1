#Librerias
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from huellitasBA import db, Animal, Barrio, Sexo,  Adopcion, Usuario

#Conexion con flask + postgresql
app = Flask(__name__)
CORS(app)
port = 5000
#Configuracion para la base de datos: HuellitasBA
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://maryalejandra:magrSQL@localhost:5432/HuellitasBA'

migrate = Migrate(app, db)


@app.route('/barrios')
def obtenerBarrios():
    try:
        barrios = Barrio.query.all()
        barriosListado = []
        for barrio in barrios:
            datoBarrio = {
                'id': barrio.idBarrio,
                'Nombre': barrio.Nombre
            }
            #Guardamos cada barrio en el listado
            barriosListado.append(datoBarrio)
        #Retornamos el json con los barrios cargados
        return jsonify({'barrios': barriosListado})
    except Exception as error:
        return jsonify({'message': f'Internal Server Error: {error}'}), 500

@app.route('/sexo')
def obtenerGenero():
    try:
        sexos = Sexo.query.all()
        sexosListado = []
        for sexo in sexos:
            datoSexo = {
                'id': sexo.idSexo,
                'Nombre': sexo.Nombre
            }
            #Guardamos cada barrio en el listado
            sexosListado.append(datoSexo)
        #Retornamos el json con los barrios cargados
        return jsonify({'sexos': sexosListado})
    except Exception as error:
        return jsonify({'message': f'Internal Server Error: {error}'}), 500

@app.route('/animal/<idAnimal>')
def obtenerAnimal(idAnimal):
    try:
        animal=Animal.query.where(Animal.idAnimal == idAnimal).first()
        barrio = Barrio.query.where(Barrio.idBarrio == animal.barrioID).first()
        sexo = Sexo.query.where(Sexo.idSexo == animal.sexoID).first()
        datosAnimal = {
            'id': animal.idAnimal,
            'Nombre': animal.Nombre,
            'Edad': animal.Edad,
            'Tipo': animal.tipoEdad,
            'Sexo':sexo.Nombre,
            'Descripcion': animal.Descripcion,
            'Foto': animal.Foto,
            'Contacto': animal.Contacto,
            'Barrio':barrio.Nombre
        }
        return jsonify({'animal': datosAnimal})
    except Exception as error:
        return jsonify({'message': f'Internal Server Error: {error}'}), 500
    
@app.route('/animal/<idAnimal>', methods = ["DELETE"])
def eliminarAnimal(idAnimal):
    try:
        animal = Animal.query.get(idAnimal)

        db.session.delete(animal)
        db.session.commit()
        
        return jsonify({'message': f'Animal {idAnimal} eliminado correctamente'})
    except Exception as error:
        return jsonify({'message': f'Internal Server Error: {error}'}), 500

@app.route('/animal/<idAnimal>', methods = ["PUT"])
def editarAnimal(idAnimal):
    try:
        animal = Animal.query.get(idAnimal)
        #Pido el json con los cambios
        datosEditados = request.json

        #Si se cambio el campo, se actualiza su valor (y sino permanece como estaba)
        if 'nombre' in datosEditados:
            animal.Nombre = datosEditados['nombre']
        if 'edad' in datosEditados:
            animal.Edad = datosEditados['edad']
        if 'tipoEdad' in datosEditados:
            animal.tipoEdad = datosEditados['tipoEdad']
        if 'descripcion' in datosEditados:
            animal.Descripcion = datosEditados['descripcion']
        if 'foto' in datosEditados:
            animal.Foto = datosEditados['foto']
        if 'contacto' in datosEditados:
            animal.Contacto = datosEditados['contacto']
        
        if 'barrio' in datosEditados:
            nombreBarrio = datosEditados['barrio']
            #busca el barrio en la tabla de barrios
            infoBarrio = Barrio.query.filter_by(Nombre = nombreBarrio).first()
            if not infoBarrio:
                #Si no existe el barrio, lo crea en la tabla de barrios
                nuevoBarrio = Barrio(Nombre=  nombreBarrio)
                db.session.add(nuevoBarrio)
                db.session.commit()

                #Actualiza el animal con el ID del barrio nuevo
                animal.barrioID = nuevoBarrio.idBarrio
            else:
                #Si el barrio existe, le pone su id al animal
                animal.barrioID = infoBarrio.idBarrio

        if 'sexo' in datosEditados:
            #busca el sexo en la tabla sexo y le pone su id al animal
            infoSexo = Sexo.query.filter_by(Nombre = datosEditados['sexo']).first()
            animal.sexoID = infoSexo.idSexo
        
        db.session.commit() 

        barrio = Barrio.query.where(Barrio.idBarrio == animal.barrioID).first()
        sexo = Sexo.query.where(Sexo.idSexo == animal.sexoID).first()

        datosAnimal = {
            'id': animal.idAnimal,
            'Nombre': animal.Nombre,
            'Edad': animal.Edad,
            'Tipo': animal.tipoEdad,
            'Sexo': sexo.Nombre,
            'Descripcion': animal.Descripcion,
            'Foto': animal.Foto,
            'Contacto': animal.Contacto,
            'Barrio':barrio.Nombre
        }

        return jsonify({'animal': datosAnimal})
    except Exception as error:
        return jsonify({'message': f'Internal Server Error: {error}'}), 500

@app.route('/animales', methods=["POST"])
def nuevoAnimal():
    try:
        animalNuevo= request.json
        nombre = animalNuevo.get('nombre')
        edad = animalNuevo.get('edad')
        tipoEdad = animalNuevo.get('tipoEdad')
        sexo = animalNuevo.get('sexo')
        descripcion = animalNuevo.get('descripcion')
        foto = animalNuevo.get('foto')
        contacto = animalNuevo.get('contacto')
        barrio = animalNuevo.get('barrio')

        #consigo el id de sexo y barrio
        infoBarrio = Barrio.query.where(Barrio.Nombre == barrio).first()
        infoSexo = Sexo.query.where(Sexo.Nombre == sexo).first()


        nuevo_animal = Animal(Nombre=nombre,Edad=edad,tipoEdad=tipoEdad,sexoID=infoSexo.idSexo,Descripcion=descripcion,Contacto=contacto,barrioID=infoBarrio.idBarrio)
        db.session.add(nuevo_animal)
        db.session.commit()
        return jsonify({'animal':{nuevo_animal.Nombre}})
    except Exception as error:
        return jsonify({'message': f'Internal Server Error: {error}'}), 500


@app.route('/animales')
def obtenerAnimales():
    try:
        animales = Animal.query.all()
        animalesListado = []
        for animal in animales:
            #Filtro el barrio y el sexo por cada animal para tener la informacion completa
            barrio = Barrio.query.where(Barrio.idBarrio == animal.barrioID).first()
            sexo = Sexo.query.where(Sexo.idSexo == animal.sexoID).first()
            #Ordeno la informacion para mostrar en la API
            datoAnimal = {
                'id': animal.idAnimal,
                'Nombre': animal.Nombre,
                'Edad': animal.Edad,
                'Tipo': animal.tipoEdad,
                'Sexo':sexo.Nombre,
                'Descripcion': animal.Descripcion,
                'Foto': animal.Foto,
                'Contacto': animal.Contacto,
                'Barrio':barrio.Nombre
            }
            #Guardamos cada animal en el listado
            animalesListado.append(datoAnimal)
        #Retornamos el json con los animales cargados
        return jsonify({'animales': animalesListado})
    except Exception as error:
        return jsonify({'message': f'Internal Server Error: {error}'}), 500



# ------------------------- Programa principal -------------------
if __name__ == '__main__':
    try:
        db.init_app(app)
        print("Servidor iniciado...")
        with app.app_context():
            db.create_all()
        app.run(host='0.0.0.0', debug=True, port=port)
    except Exception as ex:
        print(f"Fallo la conexion: {ex}")