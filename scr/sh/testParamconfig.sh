# Generación de documento MD basado en la vista documental marcada con 
# el alias propertie del repositorio de contenidos de arquitectura.


# $1: ruta archivo zconfig.yml
# $2: transformador Tx-MD
# $3: vista fuente, modelo de contenidos 
# $4: config space


# include parse_yaml function
. parse_yaml.sh
eval $(parse_yaml $1/zconfig.yml "config_")

echo Configuracion: 
# eval echo \$'config_'$4'_prg'
ruta=$(varvalue config_ $4 _prg)

echo ruta: $ruta