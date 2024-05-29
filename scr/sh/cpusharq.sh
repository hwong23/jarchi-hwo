# Actualiza reporte HMTL generado por Archi.


# include parse_yaml function
. parse_yaml.sh
eval $(parse_yaml $1/zconfig.yml "config_")
echo Configuracion: 
echo '   origenhtml:' $config_publish_gitorigen
echo '   comentario:' $2


# $1: ruta archivo zconfig.yml
# $2: msj commit

cd $config_publish_gitorigen
# cp -R $config_publish_gitorigen/webpage/index.html ../
 
 
git checkout arq
git pull --rebase
#  
# [ $? -eq 0 ] && cp -R ../index.html ./ || echo "ERR"
#  
# git add .
# git commit -a -m "$2"
# git push
#  
git checkout main
