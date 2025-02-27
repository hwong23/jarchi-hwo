#!/bin/bash

# Generación de documento MD basado en la vista documental marcada con 
# un alias (propertie) del repositorio de contenidos de arquitectura.


# $1: ruta archivo zconfig.yml
# $2: transformador Tx-MD
# $3: entrada de configuración

entradaextraccion=mdextraer

# Validacion número de argumentos
 if [ $# -lt 3 ]; then
    echo "Error: requiere 4 argumentos"
    echo '$1': ruta archivo zconfig.yml
    echo '$2': transformador Tx-MD
    echo '$3': entrada de configuración

    exit 1
  fi

# Validacion argumentos vacíos
# if [ -z "$1" ||  -z "$2"]; then
#    echo "Error: Argument is empty!"
#    exit 1
#  fi
 

# include parse_yaml function
. ./parse_yaml.sh
eval $(parse_yaml $1/zconfig.yml config_)

rutamodelo=$(varvalue config_ $entradaextraccion _rutamodelo)
rutaprg=$(varvalue config_ $entradaextraccion _rutaprg)
prg=$(echo $(varvalue config_ $3 _expportprg_$2))
# prg=$([ $2 == "-" ] && echo $(varvalue config_ $entradaextraccion _expportprg) || echo $2)
vistadoc=$(varvalue config_ $entradaextraccion _devdocalias)
rutaMacMD=$(varvalue config_ $entradaextraccion _rutaMacMD)/$3
rutaCompleta=$([ -z "$5"  ] && echo $(varvalue config_ $entradaextraccion _rutaCompleta) || echo $5)

# Validacion argumentos vacíos
if [ -z $prg ]; then
   echo "Error: El transformadorTx $tx no existe"
   exit 1
 fi



echo Configuracion: 
echo '   rutamodelo:  ' $rutamodelo
echo '   rutaprg:     ' $rutaprg
echo '   prg:         ' $prg
echo '   vistadoc:    ' $vistadoc
echo '   rutaMacMD:   ' $rutaMacMD
echo '   rutaCompleta:' $rutaCompleta


# Purga contenidos
echo "Purga contenidos $rutamodelo$rutaMacMD"
rm -Rf $rutamodelo$rutaMacM

# archi -> /Applications/Archi.app/Contents/MacOS/Archi
# echo "Archi -application com.archimatetool.commandline.app -consoleLog -nosplash \
#    --modelrepository.loadModel $rutamodelo \
#    --script.runScript $rutaprg/$prg \
#    -vistaDocumental $vistadoc \
#    -rutaMacMD $rutaMacMD \
#    -rutaCompleta $rutaCompleta"
/opt/Archi/Archi -application com.archimatetool.commandline.app -consoleLog -nosplash \
   --modelrepository.loadModel $rutamodelo \
   --script.runScript $rutaprg/$prg \
   -vistaDocumental $vistadoc \
   -rutaMacMD $rutaMacMD \
   -rutaCompleta $rutaCompleta

