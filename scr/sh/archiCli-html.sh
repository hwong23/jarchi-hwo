#!/bin/bash

# Generación de documento MD basado en la vista documental marcada con 
# el alias propertie del repositorio de contenidos de arquitectura.


# $1: ruta archivo zconfig.yml
# $2: transformador Tx-MD
# $3: entrada de configuración
# $?: vista fuente, modelo de contenidos 

entradaextraccion=mdextraer

# Validacion número de argumentos
 if [ $# -lt 3 ]; then
    echo "Error: requiere 3 argumentos"
    echo '$1': ruta archivo zconfig.yml
    echo '$2': transformador Tx-MD
    echo '$3': entrada de configuración
    # echo '$3': vista fuente del modelo de contenidos 

    exit 1
  fi 

# include parse_yaml function
. parse_yaml.sh
eval $(parse_yaml $1/zconfig.yml config_)

rutamodelo=$(varvalue config_ $entradaextraccion _rutamodelo)
rutaprg=$(varvalue config_ $entradaextraccion _rutaprg)
# prgreport=$([ -z "$5"  ] && echo $config_deploy_prgreporthtml || echo $5)
rutareport=$(varvalue config_ $entradaextraccion _rutareport)


# Validacion argumentos vacíos
if [ -z $rutareport]; then
   echo "Error: La ruta del reporte html no pude ser vacío."
   exit 1
 fi


echo Configuracion: 
echo '   rutamodelo:' $rutamodelo
echo '   rutaprg' $rutaprg
echo '   prgexporthtml': $prgreport
echo '   rutareport': $rutareport


status=$?


# Purga contenidos
# ...


[ $status -eq 0 ] && /opt/Archi/Archi -application com.archimatetool.commandline.app -consoleLog -nosplash \
   --modelrepository.loadModel $rutamodelo \
   --html.createReport $rutareport \
  || echo "ERR"

