#!/bin/bash

# Generación de documento MD basado en la vista documental marcada con 
# un alias (propertie) del repositorio de contenidos de arquitectura.

# $1: ruta archivo zconfig.yml
# $2: transformador Tx-MD [dd | solo]
# $3: entrada de configuración
# $4: alias de la vista documental (opcional)
# $5: debug (opcional, true|false). Default: false
# $6: rutaCompleta (opcional)

entradaextraccion=mdextraer

if [ $# -lt 3 ]; then
    echo "Error: requiere al menos 3 argumentos"
    echo '$1': ruta archivo zconfig.yml
    echo '$2': transformador Tx-MD
    echo '$3': entrada de configuración
   #  echo '$4': alias de la vista documental *opcional*
   #  echo '$5': debug *opcional* (true|false)
   #  echo '$6': rutaCompleta *opcional*
    exit 1
fi

. ./parse_yaml.sh
eval $(parse_yaml $1/zconfig.yml config_)

rutamodelo=$(varvalue config_ $entradaextraccion _rutamodelo)
rutaprg=$(varvalue config_ $entradaextraccion _rutaprg)
prg=$(echo $(varvalue config_ $3 _expportprg_$2))

aliasParam=${4:-alias}
debugParam=${5:-false}
vistadoc=$([ "$aliasParam" != "alias" ] && echo "$aliasParam" || echo $(varvalue config_ $entradaextraccion _devdocalias))

rutaMacMD=$(varvalue config_ $entradaextraccion _rutaMacMD)/$3
rutaCompleta=$([ -z "$6" ] && echo $(varvalue config_ $entradaextraccion _rutaCompleta) || echo $6)

if [ -z "$prg" ]; then
   echo "Error: El transformadorTx $tx no existe."
   exit 1
fi

echo Configuracion: 
echo '   rutamodelo:  ' $rutamodelo
echo '   rutaprg:     ' $rutaprg
echo '   prg:         ' $prg
echo '   vistadoc:    ' $vistadoc
echo '   rutaMacMD:   ' $rutaMacMD
echo '   rutaCompleta:' $rutaCompleta
echo '   debug:       ' $debugParam

RUTACONTD=$(eval echo $rutaMacMD)
rm -Rf $RUTACONTD
if [ -z "$( ls -A $RUTACONTD )" ]; then
   echo "OK. Purga de contenidos exitosa $RUTACONTD"
else
   echo "WARN. Purga fallida $RUTACONTD: carpeta de trabajo tiene contenidos"
fi

/opt/Archi/Archi -application com.archimatetool.commandline.app -consoleLog -nosplash \
   --modelrepository.loadModel $rutamodelo \
   --script.runScript $rutaprg/$prg \
   -vistaDocumental $vistadoc \
   -rutaMacMD $RUTACONTD \
   -rutaCompleta $rutaCompleta \
   -depuracion $debugParam




