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

echo '   rutaContd:' #2
echo '   ramaContd:' $3


git clone https://github.com/hwong23/devocs-contd.git $HOME/devocs-contd
cd $HOME/devocs-contd
git checkout --progress --force -B $3 origin/$3


# echo cp -R $config_mdextraer_rutaMacMD ./ 
# # [ $config_mdextraer_rutaMacMD -eq 0 ] && 
# cp -R $config_mdextraer_rutaMacMD ./ || echo "ERR"

ls -l $HOME/devocs-contd/contd/mddocx

# git add .
# git commit -a -m "$2"
# git push
 
# git checkout main
