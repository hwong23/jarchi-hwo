# Generación de documento MD basado en la vista documental marcada con el alias propertie del repositorio de arquitectura.

# $1: ruta archivo zconfig.yml


# include parse_yaml function
. parse_yaml.sh
eval $(parse_yaml $1/zconfig.yml "config_")
echo Configuracion: 
echo '   rutausr:' $config_development_rutausr
echo '   rutamodelo:' $config_development_rutamodelo
echo '   rutaprg' $config_development_rutaprg
echo '   vistadoc' $config_development_vistadoc
echo '   rutaexpportprg': $config_development_rutaexpportprg

# /Applications/Archi.app/Contents/MacOS/Archi -application com.archimatetool.commandline.app -consoleLog -nosplash --modelrepository.loadModel $config_development_rutamodelo --script.runScript $config_development_rutaprg -vistaDocumental $config_development_vistadoc

/Applications/Archi.app/Contents/MacOS/Archi -application com.archimatetool.commandline.app -consoleLog -nosplash --modelrepository.loadModel $config_development_rutamodelo --script.runScript $config_development_rutaexpportprg -vistaDocumental $config_development_vistadoc || echo "ERR"

