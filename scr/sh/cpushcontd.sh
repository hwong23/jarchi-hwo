#!/bin/bash
# Actualiza contenidos MD generado por Archi
# $1: ruta archivo zconfig.yml
# $2: ruta de contenidos origen
# $3: ruta contenidos destino
# $4: rama de contenidos

entradaextraccion=mdextraer

# Validacion número de argumentos
# if [ $# -lt 3 ]; then
#  echo "Error: requiere 3 argumentos"
#  echo $1: ruta archivo zconfig.ym
#  echo $2: ruta de contenidos orige
#  echo $3: ruta contenidos destino
#  echo $4: rama de contenidos
#  exit 1
# fi

# include parse_yaml function
. ./parse_yaml.sh
eval $(parse_yaml $1/zconfig.yml "config_")
rutaContdOrigen=$2
rutaContdDest=$3
# ramaContd=$4
echo '   rutaContdO:' $rutaContdOrigen
echo '   rutaContdD:' $rutaContdDest
# echo '   ramaContd:' $ramaContd

# Preperar espacio contenidos Git
# git clone https://github.com/hwong23/devocs-contd.git $HOME/devocs-contd
# cd $HOME/devocs-contd
git config --global user.email "hwong23@gmail.comm"
git config --global user.name "hwong23@gmail.comm"
# git checkout --progress --force -B $3 origin/$3

# Modificar los contenidos
cd $rutaContdDest
echo cp -R $rutaContdOrigen ./
# # [ $config_mdextraer_rutaMacMD -eq 0 ] && 
cp -R $rutaContdOrigen ./ || echo "ERR"

ls -l .

git add .
git commit -a -m accion-contd
git push

