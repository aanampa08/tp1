#Librerias
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from huellitasBA import db, Animal, Barrio, Sexo

#Conexion con flask + postgresql
app = Flask(__name__)
CORS(app)
port = 5000
#Configuracion para la base de datos: HuellitasBA
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://aliss:123456@localhost:5432/HuellitasBA'

migrate = Migrate(app, db)

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

@app.route('/animales', methods=["POST"])
def nuevoAnimal():
    try:
        animalNuevo= request.json
        nombre = animalNuevo.get('nombre')
        edad = animalNuevo.get('edad')
        tipoEdad = animalNuevo.get('tipoEdad')
        sexo = animalNuevo.get('sexo')
        descripcion = animalNuevo.get('descripcion')
        foto = animalNuevo.get('edad')
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