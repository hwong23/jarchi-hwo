# include parse_yaml function
. parse_yaml.sh

# $1: ruta repo git origen

cd $1

git add .
git commit -a -m "$2"
git push
git pull
