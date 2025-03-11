#!/bin/bash
# Actualiza contenidos MD generado por Archi
# $1: ruta archivo zconfig.yml
# $3: msj commit
# $3: rama de contenidos

entradaextraccion=mdextraer

# Validacion número de argumentos
 if [ $# -lt 3 ]; then
    echo "Error: requiere 2 argumentos"
    echo '$1': ruta archivo zconfig.yml
    echo '$2: msj commit'
    echo '$3': rama de contenidos

    exit 1
  fi

# include parse_yaml function
. ./parse_yaml.sh
eval $(parse_yaml $1/zconfig.yml "config_")

echo '   rutaMacMD:' $config_mdextraer_rutaMacMD
echo '   rutaDeployContd:' $config_mdextraer_rutaDeployContd


git clone https://github.com/hwong23/devocs-contd.git -b origin/7-propuestabmm $HOME/devocs-contd
cd $HOME/devocs-contd
# git checkout -b ramatemporal $3
# echo git checkout --progress --force -B 7-propuestabmm $3
# git checkout --progress --force -B 7-propuestabmm $3

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
