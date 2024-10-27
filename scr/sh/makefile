.PHONY: help all article article-docx article-pdf article-tex presentation presentation-html presentation-pdf presentation-pptx presentation-tex thesis thesis-docx thesis-epub thesis-pdf thesis-tex
.DEFAULT_GOAL := help

# param alias := nombre vista documental (archi.property alias)

mddoc:
	(sh archiCli-md.sh . "" \
	$(alias) mddoc)

mdpdf:
	(sh archiCli-md.sh . "" \
	$(alias) mdpdf)

mdtex:
	(sh archiCli-md.sh . "" \
	$(alias) mdtex)

mdppt:
	(sh archiCli-md.sh . Tx-exportToMarkdown-CLI-templppt.ajs \
	$(alias) mdppt)

mdhtml:
	(sh archiCli-md.sh . Tx-exportToMarkdown-CLI-md.ajs \
	$(alias) mdhtml)

exporta:
	(sh archiCli-html.sh . "" \
	$(alias) mddoc)

help:
	head -2 Makefile

all:
	# make article presentation thesis
	make mddoc mdtex mdppt html

