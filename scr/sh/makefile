.PHONY: help all article article-docx article-pdf article-tex presentation presentation-html presentation-pdf presentation-pptx presentation-tex thesis thesis-docx thesis-epub thesis-pdf thesis-tex
.DEFAULT_GOAL := help

# param alias := nombre vista documental (archi.property alias)
# tx := programa transformador (.ajs)

# TODO clean
# TODO import doc; read md file
# documento
# tema
# sitio
# presentacion
# reporte
# borrador



mddocx:
	(sh archiCli-md.sh . $(tx) \
	$(alias) mddocx)

mdpdf:
	(sh archiCli-md.sh . $(tx) \
	$(alias) mdpdf)

mdtex:
	(sh archiCli-md.sh . $(tx) \
	$(alias) mdtex)

mdppt:
	(sh archiCli-md.sh . Tx-exportToMarkdown-CLI-templppt.ajs \
	$(alias) mdppt)

mdhtml:
	(sh archiCli-md.sh . $(tx) \
	$(alias) mdhtml)


help:
	head -2 Makefile

all:
	# make documento, tema, sitio, presentacion, reporte, borrador
	# mdpdf mdtex 
	make mddocx 

documento:
	make all alias=$(alias) tx=dd

tema:
	make all alias=$(alias) tx=solo

sitio:
	make mdhtml alias=na tx=all
