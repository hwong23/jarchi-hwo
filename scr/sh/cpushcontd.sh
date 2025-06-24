#!/bin/bash
# Actualiza contenidos MD generado por Archi
# $1: ruta archivo zconfig.yml
# $2: ruta de contenidos origen
# $3: ruta contenidos destino
# $4: rama de contenidos

entradaextraccion=mdextraer

# Validacion número de argumentos
if [ $# -lt 3 ]; then
 echo "Error: requiere 3 argumentos"
 echo $1: ruta archivo zconfig.ym
 echo $2: ruta de contenidos orige
 echo $3: ruta contenidos destino
 echo $4: rama de contenidos
 exit 1
fi

# Include parse_yaml function
. ./parse_yaml.sh
eval $(parse_yaml $1/zconfig.yml "config_")
rutaContdOrigen=$2
rutaContdDest=$3
# ramaContd=$4

# Preperar espacio contenidos Git
git config --global user.email "gh_action_authr@github.comm"
git config --global user.name "gh_action_authr"
cd $rutaContdDest

echo '   rutaContdO:' $rutaContdOrigen
echo '   rutaContdD:' $rutaContdDest

# Modificar los contenidos
echo cp -R $rutaContdOrigen $rutaContdDest
rm -Rf $rutaContdDest
cp -R $rutaContdOrigen $rutaContdDest || echo "ERR"

git add .
git commit -a -m accion-actualizacionContd 
git push

