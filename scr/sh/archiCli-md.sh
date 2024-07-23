# Generación de documento MD basado en la vista documental marcada con 
# el alias propertie del repositorio de contenidos de arquitectura.


# $1: ruta archivo zconfig.yml
# $2: transformador Tx-MD
# $3: vista fuente, modelo de contenidos 
# $4: entrada de configuración


# Validacion número de argumentos
 if [ $# -lt 4 ]; then
    echo "Error: requiere 4 argumentos"
    echo '$1': ruta archivo zconfig.yml
    echo '$2': transformador Tx-MD
    echo '$3': vista fuente del modelo de contenidos 
    echo '$4': entrada de configuración

    exit 1
  fi

# Validacion argumentos vacíos
# if [ -z "$1" ||  -z "$2"]; then
#    echo "Error: Argument is empty!"
#    exit 1
#  fi
 

# include parse_yaml function
. parse_yaml.sh
eval $(parse_yaml $1/zconfig.yml config_)

rutausr=$(varvalue config_ $4 _rutausr)
rutamodelo=$(varvalue config_ $4 _rutamodelo)
rutaprg=$(varvalue config_ $4 _rutaprg)
prg=$2
vistadoc=$3
rutaexpportprg=$(varvalue config_ $4 _rutaexpportprg)
rutaMacMD=$(varvalue config_ $4 _rutaMacMD)
rutaCompleta=$([ -z "$5"  ] && echo $(varvalue config_ $4 _rutaexpportprg) || echo $5)

echo Configuracion: 
echo '   rutausr:' $rutausr
echo '   rutamodelo:' $rutamodelo
echo '   rutaprg' $rutaprg
echo '   prg:' $prg
echo '   vistadoc' $vistadoc
echo '   rutaexpportprg': $rutaexpportprg
echo '   rutaMacMD': $rutaMacMD
echo '   rutaCompleta': $rutaCompleta


/Applications/Archi.app/Contents/MacOS/Archi -application com.archimatetool.\
commandline.app -consoleLog -nosplash --modelrepository.loadModel \
$rutamodelo --script.runScript $rutaprg/$prg \
-vistaDocumental $vistadoc -rutaMacMD $rutaMacMD


# status=$?
# echo 
# echo exportSingle-htmlCLI
# [ $status -eq 0 ] && /Applications/Archi.app/Contents/MacOS/Archi -application com.archimatetool.commandline.app -consoleLog -nosplash --modelrepository.loadModel $config_development_rutamodelo --script.runScript $config_development_rutaexpportprg -vistaDocumental $config_development_vistadoc || echo "ERR"

