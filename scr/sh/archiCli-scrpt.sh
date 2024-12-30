# Generación de documento MD basado en la vista documental marcada con 
# un alias (propertie) del repositorio de contenidos de arquitectura.

# $2: rutamodelo
# $3: rutaprg
# $6: rutalectura

# Ejemplo:
# $1: $HOME/git/archigit/modelocontenidos
# $2: $HOME/git/jarchi-hwo/scr/CSV.importFromCLI.ajs
# $3: [$HOME] /Downloads/tmpr/contenido.csv


rutamodelo=$1
rutaprg=$2
rutalectura=$3


# Validacion número de argumentos
 if [ $# -lt 3 ]; then
    echo "Error: requiere 4 argumentos"
    echo '$1': rutamodelo
    echo '$2': rutaprg
    echo '$3': rutalectura

    exit 1
  fi

# Validacion argumentos vacíos
if [ -z $rutalectura ]; then
   echo "Error: ruta lectura '$rutalectura' no existe"
   exit 1
 fi


echo Configuracion: 
echo '   rutamodelo:  ' $rutamodelo
echo '   rutaprg:     ' $rutaprg
echo '   rutalectura: ' $rutalectura


/Applications/Archi.app/Contents/MacOS/Archi -application com.archimatetool.commandline.app -consoleLog -nosplash \
   --modelrepository.loadModel $rutamodelo \
   --csv.import $rutalectura
  #  --script.runScript $rutaprg \
  #  -rutaLectura $rutalectura
