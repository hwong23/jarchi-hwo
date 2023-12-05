# $1: ruta usuario repositorio git
# $2: ruta y modelo arq
# $3: ruta programa ajs


/Applications/Archi.app/Contents/MacOS/Archi -application com.archimatetool.commandline.app -consoleLog -nosplash --modelrepository.loadModel $1/$2 --script.runScript $1/jarchi-hwo/hwo/$3 -vistaDocumental $4

status=$?
# exportSingle-htmlCLI
[ $status -eq 0 ] && /Applications/Archi.app/Contents/MacOS/Archi -application com.archimatetool.commandline.app -consoleLog -nosplash --modelrepository.loadModel $1/$2 --script.runScript $1/jarchi-hwo/hwo/exportSingle-htmlCLI.ajs -vistaDocumental $4 || echo "ERR"

