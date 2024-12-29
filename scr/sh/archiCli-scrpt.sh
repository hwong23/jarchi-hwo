# Generación de documento MD basado en la vista documental marcada con 
# un alias (propertie) del repositorio de contenidos de arquitectura.

# $1: rutausr
# $2: rutamodelo
# $3: rutaprg
# $4: prg
# $5: vistadoc
# $6: rutasalida

# Ejemplo:
# $1: $HOME/git
# $2: $HOME/git/archigit/modelocontenidos
# $3: $HOME/git/jarchi-hwo/scr
# $4: CSV.importFromCLI.ajs
# $5: cutemplate
# $6: [$HOME] /Downloads/tmpr


rutausr=$1
rutamodelo=$2
rutaprg=$3
prg=$4
vistadoc=$5
rutasalida=$6


# Validacion número de argumentos
 if [ $# -lt 6 ]; then
    echo "Error: requiere 4 argumentos"
    echo '$1': rutausr
    echo '$2': rutamodelo
    echo '$3': rutaprg
    echo '$4': prg
    echo '$5': vistadoc
    echo '$6': rutasalida

    exit 1
  fi

# Validacion argumentos vacíos
# if [ -z "$1" ||  -z "$2"]; then
#    echo "Error: Argument is empty!"
#    exit 1
#  fi
 

# Validacion argumentos vacíos
if [ -z $prg ]; then
   echo "Error: El programa $tx no existe"
   exit 1
 fi


echo Configuracion: 
echo '   rutausr:     ' $rutausr
echo '   rutamodelo:  ' $rutamodelo
echo '   rutaprg:     ' $rutaprg
echo '   prg:         ' $prg
echo '   vistadoc:    ' $vistadoc
echo '   rutasalida:  ' $rutasalida


/Applications/Archi.app/Contents/MacOS/Archi -application com.archimatetool.commandline.app -consoleLog -nosplash \
   --modelrepository.loadModel $rutamodelo \
   --script.runScript $rutaprg/$prg \
   -vistaDocumental $vistadoc \
   -rutaSalida $rutasalida
