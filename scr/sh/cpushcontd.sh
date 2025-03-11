#!/bin/bash
# Actualiza contenidos MD generado por Archi
# $1: ruta archivo zconfig.yml
# $2: msj commit

entradaextraccion=mdextraer

# Validacion número de argumentos
 if [ $# -lt 2 ]; then
    echo "Error: requiere 2 argumentos"
    echo '$1': ruta archivo zconfig.yml
    echo '$2: msj commit'

    exit 1
  fi

# include parse_yaml function
. ./parse_yaml.sh
eval $(parse_yaml $1/zconfig.yml "config_")

echo '   rutaMacMD:' $config_mdextraer_rutaMacMD
echo '   rutaDeployContd:' $config_mdextraer_rutaDeployContd

cd $HOME
git clone https://github.com/hwong23/devocs-contd.git

ls -l $HOME/devocs-contd

# cd $config_publish_gitorigen
# cp webpage/index.html ..
 
 
# git checkout arq
# git pull --rebase

# [ $? -eq 0 ] && cp -R ../index.html ./ || echo "ERR"

# git add .
# git commit -a -m "$2"
# git push
 
# git checkout main
