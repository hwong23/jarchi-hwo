git add .
git commit -a -m "$1"
git push
git pull

sh cpusharq.sh $1
