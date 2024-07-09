# Generación de documento MD basado en la vista documental marcada con 
# el alias propertie del repositorio de contenidos de arquitectura.


# $1: ruta archivo zconfig.yml
# $2: transformador Tx-MD
# $3: vista fuente, modelo de contenidos 



# include parse_yaml function
. parse_yaml.sh
eval $(parse_yaml $1/zconfig.yml "config_")
config_development_prg=$2
config_development_vistadoc=$3
echo Configuracion: 
echo '   rutausr:' $config_development_rutausr
echo '   rutamodelo:' $config_development_rutamodelo
echo '   rutaprg' $config_development_rutaprg
echo '   prg:' $config_development_prg
echo '   vistadoc' $config_development_vistadoc
echo '   rutaexpportprg': $config_development_rutaexpportprg
echo '   otro': $config_development_otro


/Applications/Archi.app/Contents/MacOS/Archi -application com.archimatetool.\
commandline.app -consoleLog -nosplash --modelrepository.loadModel \
$config_development_rutamodelo --script.runScript $config_development_rutaprg/$config_development_prg \
-vistaDocumental $config_development_vistadoc


# status=$?
# echo 
# echo exportSingle-htmlCLI
# [ $status -eq 0 ] && /Applications/Archi.app/Contents/MacOS/Archi -application com.archimatetool.commandline.app -consoleLog -nosplash --modelrepository.loadModel $config_development_rutamodelo --script.runScript $config_development_rutaexpportprg -vistaDocumental $config_development_vistadoc || echo "ERR"

