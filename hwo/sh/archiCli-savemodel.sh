# $1: ruta usuario repositorio git
# $2: ruta y modelo arq
# $3: ruta programa ajs


/Applications/Archi.app/Contents/MacOS/Archi -application com.archimatetool.commandline.app -consoleLog -nosplash --modelrepository.loadModel $1/$2 --script.runScript $1/jarchi-hwo/examples/$3 -vistaDocumental $4

