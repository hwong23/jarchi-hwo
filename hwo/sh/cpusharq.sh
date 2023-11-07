# Actualiza reporte HMTL generado por Archi.
# $1: ruta repo git origen
# $2: origen HTML
# $3: msj commit

cd $1
cp -R $1/webpage/index.html ../


git checkout arq
git pull
 
[ $? -eq 0 ] && cp -R ../index.html ./ || echo "ERR"
 
git add .
git commit -a -m "$3"
git push
 
git checkout main
