git checkout gh-pages

cp $1/index.html $2/gh-pages

git add .
git commit -a -m "$1"
git push
git pull
