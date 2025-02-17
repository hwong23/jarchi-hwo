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
	(sh archiCli-md.sh . $(tx) \
	$(alias) mddocx)

mdpdf:
	(sh archiCli-md.sh . $(tx) \
	$(alias) mdpdf)

mdtex:
	(sh archiCli-md.sh . $(tx) \
	$(alias) mdtex)

mdppt:
	(sh archiCli-md.sh . $(tx) \
	$(alias) mdppt)

mdhtml:
	(sh archiCli-md.sh . $(tx) \
	$(alias) mdhtml)


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
