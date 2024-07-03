.PHONY: help all article article-docx article-pdf article-tex presentation presentation-html presentation-pdf presentation-pptx presentation-tex thesis thesis-docx thesis-epub thesis-pdf thesis-tex
.DEFAULT_GOAL := help


help:
	head -2 Makefile

all:
	# make article presentation thesis
	make md html

md:
	# (cd article && \
	# pandoc --defaults=./../defaults.yaml --defaults=docx.yaml)
	(sh archiCli-md.sh .)

html:
	# (cd article && \
	# pandoc --defaults=./../defaults.yaml --defaults=pdf.yaml)
	(sh archiCli-html.sh .)
