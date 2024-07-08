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


// Below is a hashtable of settings which define what to include in each section of the document (group). If not overridden by a group, these settings will apply to the entire document generated from a driving view.
// A property of the same name of the settings below on the driving view or a group, will override this value for anything nested under that section of the document, unless overridden again.
var devdocs_DefaultInclusionSettings = {
    "IncludeDiagram": true,       // if true, will include the view's diagram
    "IncludeDocumentation": true, // if true, will include the view's documentation text (which itself can have markdown, by the way)
    "IncludeViewElements": true,  // if true, will include a catalogue of the view's elements
    "IncludeProperties": true,    // if true, will include the "properties" field in a catalogue of elements from a view
    //TODO: "ElementColumns": [{name: "Name", field: "name"}], // overrides the list of columns to include in the element catalogue (need to find a structure we can easily set in a property that we hopefully don't have to parse)
};


function replaceNL(strIn) {
    if (null === strIn || "string" !== typeof strIn) return "";
    var newStr = strIn.replace(/[\r\n]+/gm, "<br>");
    return newStr;
}

function addPropsAsItalic(thisObj) {
    var propts = '';

    // Bold keys take up even less space
    var theProperties = thisObj.prop();
    if (theProperties) {
        for (key in theProperties) {
            if ((theProperties[key] != 'label') && (theProperties[key] != "drill down")) {
                propts += "*" + theProperties[key] + ":* " + thisObj.prop(theProperties[key]) + "<br>";
            }
        }
    }

    return propts;
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

// Shallow clones attributes of a basic object
function shallowClone(obj) {
    // If the object provided is not actually an object, return null so we don't accidentally clobber some other reference
    if (null === obj || "object" !== typeof obj) {
        return null;
    }

    // Create a new, blank, object, then copy over the attributes
    var copy = {};
    for (var attr in obj) {
        copy[attr] = obj[attr];
    }
    return copy;
}

// Retorna una mezcla de configuración objeto+padre+default
// settingsElement: reference to the driving view or a group which may have overriding settings
// defaultSettings: settings object to use as default (required)
function devdoc_getGroupInclusionSettings(settingsElement, defaultSettings) {
    // Check default settings
    if (defaultSettings === null ||
        typeof defaultSettings !== "object" ||
        defaultSettings["IncludeDiagram"] === null ||
        defaultSettings["IncludeDocumentation"] === null ||
        defaultSettings["IncludeViewElements"] === null ||
        defaultSettings["IncludeProperties"] === null
        // defaultSettings["IncluyeRelaciones"] === null
    ) {
        console.log("Default settings were not correctly passed to a child node");
        return (null);
    }

    var settings = shallowClone(defaultSettings);

    // Check for overrides
    var checkIncludeDiagram = settingsElement.prop("IncludeDiagram");
    var checkIncludeDocumentation = settingsElement.prop("IncludeDocumentation");
    var checkIncludeElements = settingsElement.prop("IncludeViewElements");
    var checkIncludeProperties = settingsElement.prop("IncludeProperties");
    var checkIncluyeRelaciones = settingsElement.prop("IncluyeRelaciones");

    if (checkIncludeDiagram !== null) {
        settings["IncludeDiagram"] = checkIncludeDiagram === "true" ? true : false;
    }
    if (checkIncludeDocumentation !== null) {
        settings["IncludeDocumentation"] = checkIncludeDocumentation === "true" ? true : false;
    }
    if (checkIncludeElements !== null) {
        settings["IncludeViewElements"] = checkIncludeElements === "true" ? true : false;
    }
    if (checkIncludeProperties !== null) {
        settings["IncludeProperties"] = checkIncludeProperties === "true" ? true : false;
    }
    if (checkIncluyeRelaciones !== null) {
        settings["IncluyeRelaciones"] = checkIncluyeRelaciones === "true" ? true : false;
    }


    return settings;
}

function devdoc_useDrivingView(alias) {
    // drivingView = selection.filter("archimate-diagram-model").first();
    
    drivingView = $("view").filter(function(o) { 
        var dd_alias = o.prop("alias") ? o.prop("alias"):"";
        return (dd_alias === alias);
    }).first();
    
    if (!drivingView) {
        console.log("Please open and select a Driving View for the documentation");
        return (false);
    } 
    else {
        var inclusionSettings = devdoc_getGroupInclusionSettings(model, devdocs_DefaultInclusionSettings);
        inclusionSettings = devdoc_getGroupInclusionSettings(drivingView, inclusionSettings);
        console.log("Default IncludeDiagram setting: " + inclusionSettings["IncludeDiagram"]);
        console.log("Default IncludeDocumentation setting: " + inclusionSettings["IncludeDocumentation"]);
        console.log("Default IncludeViewElements setting: " + inclusionSettings["IncludeViewElements"]);
        console.log("Default IncludeProperties setting: " + inclusionSettings["IncludeProperties"]);
    }

    return drivingView;

} // end of useDrivingView


