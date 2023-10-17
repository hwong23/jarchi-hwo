# Actualiza reporte HMTL generado por Archi.
# $1: ruta repo git origen
# $2: origen HTML
# $3: msj commit

cp -R $2/webbpage/index.html ../

cd $1

git checkout arq
git pull

cp -R ../index.html .

git add .
git commit -a -m "$3"
git push

git checkout main
