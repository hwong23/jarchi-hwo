.PHONY: help mddocx mdpdf mdtex mdppt
.DEFAULT_GOAL := help

# Versión:
#    tx := programa transformador (.ajs)
#    alias := alias de la vista documental
#    debug := true|false

alias ?= alias
debug ?= false

mddocx:
	(bash archiCli-md.sh . $(tx) mddocx $(alias) $(debug))

mdpdf:
	(bash archiCli-md.sh . $(tx) mdpdf $(alias) $(debug))

mdtex:
	(bash archiCli-md.sh . $(tx) mdtex $(alias) $(debug))

mdppt:
	(bash archiCli-md.sh . $(tx) mdppt $(alias) $(debug))

mdhtml:
	(bash archiCli-md.sh . $(tx) mdhtml $(alias) $(debug))

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

