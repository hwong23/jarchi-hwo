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

reporthtml:
	(bash archiCli-html.sh . $(tx) report)


help:
	head -2 makefile

documento:
# alias = zconfig.yml
	make mdtex mdpdf mddocx tx=dd

# tema:
# # alias = zconfig.yml
# 	make all tx=solo

sitio:
# alias = zconfig.yml
	make mdhtml tx=all

reporte:
	make reporthtml tx=all


all:
	# make documento, tema, sitio, presentacion, reporte, borrador
	make mdtex mdpdf mddocx reporte

