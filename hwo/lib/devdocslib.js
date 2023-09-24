// HWO
/*
	Sourced: https://gist.github.com/rich-biker/9a3c86c5a576ce0d8639856f3ee81651

	Script: Documentation Generation
	Purpose: To generate output based on a driving view

	Author: Richard Heward - Tame Blue Lion Ltd

	This generates a markdown file with the embedded images and text based upon a driving view in Archi of groups that trigger each other and embedded views. 	See my blog for a more detailed explaination. https://www.tamebluelion.co.uk/blog/archi-documentation

	Setting embed to false will have the images saved to file and references placed in the document. It's then up to your markdown engine. This isn't that well tested.
	Setting
	Note - markdown can be converted to PDF / Word Docs or anything. I've used pandoc command line to do this.
*/

function replaceNL(strIn) {
    if (null === strIn || "string" !== typeof strIn) return "";
    var newStr = strIn.replace(/[\r\n]+/gm, "<br>");
    return newStr;
}

function addPropsAsItalic(thisObj) {
    // Bold keys take up even less space
    var theProperties = thisObj.prop();
    if (theProperties) {
        for (key in theProperties) {
            if ((theProperties[key] != 'label') && (theProperties[key] != "drill down")) {
                outInfo_vista += "*" + theProperties[key] + ":* " + thisObj.prop(theProperties[key]) + "<br>";
            }
        }
    }
}

function salidaEncbzdo(Level, Name, AddLink, Doc) {

    var outDoc = "";
    var indent = "";
    var tocIndent = "";

    for (var i = 0; i < Level; i++) {
        indent = indent + "#";
    }
    for (var j = 0; j < Level - 1; j++) { // ToC needs one less indent tab.
        tocIndent = tocIndent + "\t";
    }

    if (Name != "Catálogo de Elementos") {
        console.log(addSpace(Level - 1), Name);
    }

    var outHdr = indent + " " + Name;

    // Quiebre de página
    if (Level === 1) {
        outDoc += '<div style="page-break-before: always;"></div>';
        outDoc += "\n\\newpage\n";
        // outDoc += "\n ___ \n"; // horiz line before level 1's
    }
    
    // put a fudge post processing to insert 'NEWPAGE' in for header levels listed in listofNewpageheaders
    if (hardNewpage) {
        if (listofNewpageheaders.indexOf(Level) != -1) {
            outDoc += "\n\\newpage\n";
        }
    }
    
    outDoc += "\n" + outHdr;
    
    // Add a link to table of contents (TOC), if requested
    if (AddLink) {
        var thisLink = generateLink(Name);
        
        // No es necesario repetir el vínculo (markdown ya vincula los títulos)
        // outDoc += "\n" + "[](" + thisLink + ")\n";
        
        theToc += tocIndent + "* [" + Name + "](" + thisLink + ")\n";
    }
    
    if (Doc) {
        outDoc += "\n" + Doc;
    }

    return outDoc;
}