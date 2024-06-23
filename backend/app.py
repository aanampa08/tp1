#Librerias
from flask import Flask, request, jsonify
from huellitasBA import db, Animal, Barrio, Sexo
from flask_migrate import Migrate

#Conexion con flask + postgresql
app = Flask(__name__)
port = 5000
#Configuracion para la base de datos: HuellitasBA
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://aliss:123456@localhost:5432/HuellitasBA'

migrate = Migrate(app, db)

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