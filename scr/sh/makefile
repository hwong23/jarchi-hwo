.PHONY: help all article article-docx article-pdf article-tex presentation presentation-html presentation-pdf presentation-pptx presentation-tex thesis thesis-docx thesis-epub thesis-pdf thesis-tex
.DEFAULT_GOAL := help


mddoc:
	(sh archiCli-md.sh . Tx-exportToMarkdown-CLI-md.ajs $(devdoc) mddoc)

mdtex:
	(sh archiCli-md.sh . Tx-exportToMarkdown-CLI-templtex.ajs $(devdoc) mdtex)

mdppt:
	(sh archiCli-md.sh . Tx-exportToMarkdown-CLI-templppt.ajs $(devdoc) mdppt)

html:
	# (cd article && \
	# pandoc --defaults=./../defaults.yaml --defaults=pdf.yaml)
	(sh archiCli-html.sh .)

entrega: 
	

help:
	head -2 Makefile

all:
	# make article presentation thesis
	make mddoc mdtex mdppt html

