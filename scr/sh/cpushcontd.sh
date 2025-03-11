#!/bin/bash
# Actualiza contenidos MD generado por Archi
# $1: ruta archivo zconfig.yml
# $3: msj commit
# $3: rama de contenidos

entradaextraccion=mdextraer

# Validacion número de argumentos
# if [ $# -lt 3 ]; then
#     echo "Error: requiere 3 argumentos"
#     echo '$1': ruta archivo zconfig.yml
#     echo '$2': ruta de contenidos
#     echo '$3': rama de contenidos

#     exit 1
# fi

# include parse_yaml function
. ./parse_yaml.sh
eval $(parse_yaml $1/zconfig.yml "config_")
rutaContd=$2/contd
ramaContd=#3
echo '   rutaContd:' $rutaContd
echo '   ramaContd:' $ramaContd


git clone https://github.com/hwong23/devocs-contd.git $HOME/devocs-contd
cd $HOME/devocs-contd
git config --global user.email "hwong23@gmail.comm"
git config --global user.name "hwong"
git checkout --progress --force -B $3 origin/$3


echo cp -R $rutaContd ./ 
# # [ $config_mdextraer_rutaMacMD -eq 0 ] && 
cp -R $rutaContd ./ || echo "ERR"

ls -l $HOME/devocs-contd/contd/*

git add .
git commit -a -m accion-contd
git push
 
