# Huellitas BA

## Instalación

- Crear un entorno virtual con el comando   
    python3 -m venv venv  

- Iniciar el entorno virtual con el comando  
    source venv/bin/activate

- Instalar dependencias  
    pip install Flask  
    pip install Flask-SQLAlchemy  
    pip install flask_migrate  
    pip install psycopg2-binary  
    pip install flask-cors  

- Se necesita tener postgreSQL instalado.

- Crear la base de datos en postgreSQL  
    CREATE DATABASE "HuellitasBA";

- Modificar el app.config en el archivo app.py para que este configurado con los datos de quien lo está usando.

- Ejecutar el archivo app.py para que se creen las tablas de la base de datos.  
    cd backend    
    python3 app.py

- Ejecutar los scripts para llenar la base de datos desde la terminal.  
    - Primero se deben insertar los barrios y el género, dado que de esos datos depende la tabla de animales.  
        psql -U tu_usuario -d HuellitasBA -a -f ruta_al_archivo



## Utilizacion normal

- Frontend  
    cd frontend  
    python3 -m http.server

- Backend
    - Chequear que el app.config en el archivo app.py este configurado con los datos de quien lo está usando.

    - source venv/bin/activate  
      cd backend  
      python3 app.py


--- 
#### Modelo de las tablas para la base de datos:  
https://drive.google.com/file/d/1HH_GLv05cyxGCl6Ls3cx42eBlo3tJfTi/view?usp=sharing
