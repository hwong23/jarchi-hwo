# include parse_yaml function
. parse_yaml.sh

# include parse_yaml function
. parse_yaml.sh
eval $(parse_yaml $1/zconfig.yml "config_")
echo Configuracion: 
echo '   gitorigen:' $config_ccambio_gitorigen
echo '   cambio:' $2


# $1: ruta archivo zconfig.yml
# $2: comentario cambio

cd $config_ccambio_gitorigen

git add .
git commit -a -m "$2"
git push
git pull
