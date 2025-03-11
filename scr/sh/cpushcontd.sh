#!/bin/bash
# Actualiza contenidos MD generado por Archi
# $1: ruta archivo zconfig.yml
# $2: msj commit

entradaextraccion=mdextraer

# Validacion número de argumentos
 if [ $# -lt 3 ]; then
    echo "Error: requiere 4 argumentos"
    echo '$1': ruta archivo zconfig.yml
    echo '$2': transformador Tx-MD
    echo '$3': entrada de configuración

    exit 1
  fi

# include parse_yaml function
. ./parse_yaml.sh
eval $(parse_yaml $1/zconfig.yml "config_")

rutaMacMD=$(varvalue config_ $entradaextraccion _rutaMacMD)
echo '   rutaMacMD:' $rutaMacMD

# cd $config_publish_gitorigen
# cp webpage/index.html ..
 
 
# git checkout arq
# git pull --rebase

# [ $? -eq 0 ] && cp -R ../index.html ./ || echo "ERR"

# git add .
# git commit -a -m "$2"
# git push
 
# git checkout main
