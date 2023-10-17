# $1: ruta repo git origen
# $1: ruta repo git destino
# $3: msj commit

cd $1

git checkout gh-pages

[ $? -eq 0 ] && cp $1/webpage/index.html $2/gh-pages || echo "ERR"

git add .
git commit -a -m "$3"
git push
git pull

git checkout master
