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
