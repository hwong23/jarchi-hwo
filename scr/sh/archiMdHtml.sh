# Actualiza documentos MD generados por Archi

# $1: ruta archivo zconfig.yml


# include parse_yaml function
. parse_yaml.sh
eval $(parse_yaml $1/zconfig.yml "config_")
echo Configuracion: 
echo '   origenmd:' $config_deploy_origenmd
echo '   destinomd:' $config_deploy_destinomd
echo '   origenhtml' $config_deploy_origenhtml


# MD
mv $config_deploy_origenmd/*.md $config_deploy_destinomd/content/
mv $config_deploy_origenmd/images/*.png $config_deploy_destinomd/content/images/

# HTML
cp -R $config_deploy_origenhtml/*.html $config_deploy_destinomd/webpage/
