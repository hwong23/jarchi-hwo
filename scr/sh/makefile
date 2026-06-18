.PHONY: help mddocx mdpdf mdtex mdppt
.DEFAULT_GOAL := help

# Versiones:
#    tx := programa transformador (.ajs)
#    Parámetro `alias` pasado por línea de comandos. Valor por defecto "alias".

# TODO import doc; read md file
# documento
# tema
# sitio
# presentacion
# reporte
# borrador


# Parámetro `alias` pasado por línea de comandos
alias ?= alias



mddocx:
	(bash archiCli-md.sh . $(tx) mddocx $(alias))

mdpdf:
	(bash archiCli-md.sh . $(tx) mdpdf $(alias))

mdtex:
	(bash archiCli-md.sh . $(tx) mdtex $(alias))

mdppt:
	(bash archiCli-md.sh . $(tx) mdppt $(alias))

mdhtml:
	(bash archiCli-md.sh . $(tx) mdhtml $(alias))

reporthtml:
	(bash archiCli-html.sh . $(tx) report $(alias))


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

