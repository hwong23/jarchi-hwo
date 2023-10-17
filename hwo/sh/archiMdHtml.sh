# Actualiza documentos MD generados por Archi

# $1: origen MD
# $2: destino
# $3: origen HTML

# MD
mv $1/*.md $2/content/
mv $1/images/*.png $2/content/images/

# HTML
[ $? -eq 0 ] && cp $3/*.html $2/webpage/ || echo "ERR"

