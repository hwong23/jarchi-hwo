.PHONY: help all article article-docx article-pdf article-tex presentation presentation-html presentation-pdf presentation-pptx presentation-tex thesis thesis-docx thesis-epub thesis-pdf thesis-tex
.DEFAULT_GOAL := help


mddoc:
	(sh archiCli-md.sh . "" \
	$(devdoc) mddoc)

mdpdf:
	(sh archiCli-md.sh . "" \
	$(devdoc) mdpdf)

mddoc2:
	(sh archiCli-md.sh . Tx-exportToMarkdown-CLI-md.ajs \
	$(devdoc) mddoc)

mdtex:
	(sh archiCli-md.sh . Tx-exportToMarkdown-CLI-templtex.ajs \
	$(devdoc) mdtex)

mdppt:
	(sh archiCli-md.sh . Tx-exportToMarkdown-CLI-templppt.ajs \
	$(devdoc) mdppt)

mdhtml:
	(sh archiCli-md.sh . Tx-exportToMarkdown-CLI-md.ajs \
	$(devdoc) mdhtml)

entrega: 
	

help:
	head -2 Makefile

all:
	# make article presentation thesis
	make mddoc mdtex mdppt html

