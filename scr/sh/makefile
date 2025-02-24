.PHONY: help mddocx mdpdf mdtex mdppt
.DEFAULT_GOAL := help

# param alias := nombre vista documental (archi.property alias)
# tx := programa transformador (.ajs)

# TODO import doc; read md file
# documento
# tema
# sitio
# presentacion
# reporte
# borrador



mddocx:
	(bash archiCli-md.sh . $(tx) mddocx)

mdpdf:
	(bash archiCli-md.sh . $(tx) mdpdf)

mdtex:
	(bash archiCli-md.sh . $(tx) mdtex)

mdppt:
	(bash archiCli-md.sh . $(tx) mdppt)

mdhtml:
	(bash archiCli-md.sh . $(tx) mdhtml)


help:
	head -2 makefile

all:
	# make documento, tema, sitio, presentacion, reporte, borrador
	make mdtex mdpdf mddocx

documento:
	make all alias=$(alias) tx=dd

tema:
	make all alias=$(alias) tx=solo

sitio:
	make mdhtml alias=na tx=all
