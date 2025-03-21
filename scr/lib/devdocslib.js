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

   
*  Version 4.3: Funciones de librería devdoc
 *
 *  (c) 2018 Steven Mileham, HWO
 *
 
*/

var devdoc_debug = false;


// Below is a hashtable of settings which define what to include in each section of the document (group). If not overridden by a group, these settings will apply to the entire document generated from a driving view.
// A property of the same name of the settings below on the driving view or a group, will override this value for anything nested under that section of the document, unless overridden again.
var devdoc_DefaultInclusionSettings = {
    "IncludeDiagram": true,                 // if true, will include the view's diagram
    "IncludeDocumentation": true,           // if true, will include the view's documentation text (which itself can have markdown, by the way)
    "IncludeViewElements": true,            // if true, will include a catalogue of the view's elements
    "IncludeProperties": true,              // if true, will include the "properties" field in a catalogue of elements from a view
    "IncludeRutaCompleta": false,           // verdadero, incluye la ruta completa en los MD para favorecer a los documentos de salida
    "IncluyeRelaciones": false,             // incluye la ruta completa en los MD para favorecer a los documentos de salida
    "IncluyeElementosSindoc": false,        // incluye elementos sin documentación
    "IncluyeSaltosLineaElementos": true,    // incluye saltos de línea en la documentación de elementos
    "DocumentosIndividualesxVista": false    // escribe documentos MD separados cada vista
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

function devdoc_salidaEncbzdo(Level, Name, AddLink, Doc) {

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
        var thisLink = devdoc_generateLink(Name);
        
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
function devdoc_shallowClone(obj) {
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
function devdoc_getGroupInclusionSettings(settingsElement, parentSettings) {
    // Check default settings
    if (parentSettings === null ||
        typeof parentSettings !== "object" ||
        parentSettings["IncludeDiagram"] === null ||
        parentSettings["IncludeDocumentation"] === null ||
        parentSettings["IncludeViewElements"] === null ||
        parentSettings["IncludeProperties"] === null ||
        parentSettings["IncluyeRelaciones"] === null ||
        parentSettings["IncludeRutaCompleta"] === null ||
        parentSettings["IncluyeElementosSindoc"] === null ||
        parentSettings["IncluyeSaltosLineaElementos"] == null ||
        parentSettings["DocumentosIndividualesxVista"] == null
    ) {
        console.log("Default settings were not correctly passed to a child node");
        return (null);
    }

    var settings = devdoc_shallowClone(parentSettings);

    // Check for overrides
    var checkIncludeDiagram = settingsElement.prop("IncludeDiagram");
    var checkIncludeDocumentation = settingsElement.prop("IncludeDocumentation");
    var checkIncludeElements = settingsElement.prop("IncludeViewElements");
    var checkIncludeProperties = settingsElement.prop("IncludeProperties");
    var checkIncludeRutaCompleta = settingsElement.prop("IncludeRutaCompleta");
    var checkIncluyeRelaciones = settingsElement.prop("IncluyeRelaciones");
    var checkIncluyeElementosSindoc = settingsElement.prop("IncluyeElementosSindoc");
    var checkIncluyeSaltosLineaElementos = settingsElement.prop("IncluyeSaltosLineaElementos");
    var checkDocumentosIndividualesxVista = settingsElement.prop("DocumentosIndividualesxVista");

    if (checkIncludeDiagram !== null) {
        settings["IncludeDiagram"] = checkIncludeDiagram === "true"? true : false;
    }
    if (checkIncludeDocumentation !== null) {
        settings["IncludeDocumentation"] = checkIncludeDocumentation === "true"? true : false;
    }
    if (checkIncludeElements !== null) {
        settings["IncludeViewElements"] = checkIncludeElements === "true"? true : false;
    }
    if (checkIncludeProperties !== null) {
        settings["IncludeProperties"] = checkIncludeProperties === "true"? true : false;
    }
    if (checkIncludeRutaCompleta !== null) {
        settings["IncludeRutaCompleta"] = checkIncludeRutaCompleta === "true"? true : false;
    }
    if (checkIncluyeRelaciones !== null) {
        settings["IncluyeRelaciones"] = checkIncluyeRelaciones === "true"? true : false;
    }
    if (checkIncluyeElementosSindoc !== null) {
        settings["IncluyeElementosSindoc"] = checkIncluyeElementosSindoc === "true"? true : false;
    }
    if (checkIncluyeSaltosLineaElementos !== null) {
        settings["IncluyeSaltosLineaElementos"] = checkIncluyeSaltosLineaElementos === "true"? true : false;
    }
    if (checkDocumentosIndividualesxVista !== null) {
        settings["DocumentosIndividualesxVista"] = checkDocumentosIndividualesxVista === "true"? true : false;
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
        var inclusionSettings = devdoc_getGroupInclusionSettings(model, devdoc_DefaultInclusionSettings);
        inclusionSettings = devdoc_getGroupInclusionSettings(drivingView, inclusionSettings);
        console.log("Default IncludeDiagram setting: " + inclusionSettings["IncludeDiagram"]);
        console.log("Default IncludeDocumentation setting: " + inclusionSettings["IncludeDocumentation"]);
        console.log("Default IncludeViewElements setting: " + inclusionSettings["IncludeViewElements"]);
        console.log("Default IncludeProperties setting: " + inclusionSettings["IncludeProperties"]);
        console.log("Default IncludeRutaCompleta setting: " + inclusionSettings["IncludeRutaCompleta"]);
        console.log("Default IncluyeRelaciones setting: " + inclusionSettings["IncluyeRelaciones"]);
        console.log("Default IncluyeElementosSindoc setting: " + inclusionSettings["IncluyeElementosSindoc"]);
        console.log("Default IncluyeSaltosLineaElementos setting: " + inclusionSettings["IncluyeSaltosLineaElementos"]);
        console.log("Default DocumentosIndividualesxVista setting: " + inclusionSettings["DocumentosIndividualesxVista"]);
    }

    (debug)? console.log ('devdoc_useDrivingView: ', drivingView.name): true;
    return drivingView;

} // end of useDrivingView


function devdoc_documentRelationships(element) {
    var theHeader = "|Desde|Relación|Hacia|Nombre|Descrip|"
    var theLine = "|---|---|---|---|---|";
    var theBody = "";
    $(element).outRels().each(function(r){
        var q= r.concept;
        if (r.type!="diagram-model-connection") {
            theBody+="|"+r.source.name;
            theBody+="|"+devdoc_convertToText(r.type);
            if (q.accessType) {
                theBody+=" ("+q.accessType+")";
            }
            if (q.influenceStrength) {
                theBody+=" ("+q.influenceStrength+")";
            }
            theBody+="|["+ devdoc_escapeMD(r.target.name)  +" ("+ devdoc_convertToText(r.target.type) +")]("+devdoc_generateLink(r.target.name +" ("+ devdoc_convertToText(r.target.type)+")")+")";
            theBody+="|"+r.name;
            theBody+="|"+r.documentation+"|\n";
        }
    });

    return "**Relaciones (impacto)**\n"+theHeader+"\n"+theLine+"\n"+theBody;
}


function devdoc_propertiesTable(element) {
    var theProperties = element.prop();
    var theHeader="";
    var theLine="";
    var theBody="";
    for (var i=0; i<theProperties.length;i++){
        theHeader+="|"+theProperties[i];
        theLine+="|---";
        theBody+="|"+element.prop(theProperties[i]);
    }
    return "**Properties**\n"+theHeader+"|\n"+theLine+"|\n"+theBody+"|\n";
}


// Helper function - convert a value to a color between azul y verde
function devdoc_getColorValue(num, maxValue) {
    var red = 0;
    var green = Math.round(255 * (num / maxValue));
    var blue = Math.round(255 - (255 * (num / maxValue)));
    
    return devdoc_convertRGBToHexString(red, green, blue);
}

// Helper function - convert rgb values to a hex color string. Format is #rrggbb
function devdoc_convertRGBToHexString(red, green, blue) {
    red = red.toString(16);
    if(red.length == 1) red = "0" + red;

    green = green.toString(16);
    if(green.length == 1) green = "0" + green;

    blue = blue.toString(16);
    if(blue.length == 1) blue = "0" + blue;

    return '#' + red + green + blue;
}


function devdoc_escapeMD(theString){
    var newString = theString.replaceAll("<","&lt;").replaceAll("\n>","\n~QUOTE~");
    return newString.substring(0,1)+newString.substring(1).replaceAll(">","&gt;").replaceAll("~QUOTE~",">");
}

function devdoc_escapeDOC(theString){
    var newString = theString.replaceAll("<<","(");
    return newString.substring(0,1) +
           newString.substring(1).replaceAll(">>",")");
}

function devdoc_generateLink(theString) {
    var regex = /[\[\]\(\)\#\\\/\"]/gi;
    return "#"+theString.toLowerCase().replace(regex,"")
                                      .replaceAll(" ","-");
                                    //   .replaceAll("\<","lt")
                                    //   .replaceAll("\>","gt");
}


function devdoc_convertToText(type) {
    var theString = type.replaceAll("-"," ").split(" ");
    var theResult = "";
    for (var i=0; i<theString.length; i++){
        theResult+= theString[i][0].toUpperCase()+theString[i].substring(1,theString[i].length) + " ";
    }
    return theResult.trim();
}

function devdoc_toc(nivel, element, include, o_toc, incluyeElementosSindoc = true, incluyeTipo = true){
    $(element).children().not("relationship").filter(function(child) {
        // permite elementos sin documentación?
        var prop_destino = child.prop("destino");
        return (prop_destino? (prop_destino.includes(include)? true:false): false)
    }).each(function(e) 
    {
        if (e.name) {
            headerDepth="";
            for (var i=0; i<nivel; i++){
                headerDepth+="  ";
            }
            var theHash = devdoc_generateLink(e.name +" ("+ devdoc_convertToText(e.type)+")");
            if (tocMap[theHash]==null) {
                tocMap[theHash]=1;
            }
            else {
                tocMap[theHash]+=1;
            }

            var linkNum="";

            if (tocMap[theHash]>1) {
                linkNum = "-"+tocMap[theHash];
            }

            o_toc+="\n"+headerDepth +
                "* ["+ devdoc_escapeMD(e.name) +
                (incluyeTipo ? " ("+devdoc_convertToText(e.type)+")": '') +
                linkNum.replace("-"," ")+"]("+theHash+linkNum+")";
            if ($(e).children().not("relationship").length>0) {
                nivel++;
                o_toc=devdoc_toc(nivel, e, 'doc', o_toc);
                nivel--;
            }
        }
    });

    return o_toc;
}

// Notes with no relationships
function devdoc_obtNota (theView) {
    var notatexto = '';
    var c = $(theView).find().not("element").not("relationship").first();

    try {
        if (c !== null) {
            if ($(c).rels().length==0) {
                notatexto = (c.text)? 
                    notatexto + c.text + '\n\n': '\n\n';
            }
        };
    }
    catch(err) {
        console.error(c.name);
    }

    return notatexto;
}


function devdoc_properCase(str) {
    return str.replace(
      /\w*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    ).replace('-', ' ');
  }

  
function devdoc_addSpace(numSpaces) {
  var i;
  var rtnText = " ";
  for (i = 0; i < numSpaces; i++) {
      rtnText += "   ";
  }
  return rtnText;
}


function devdoc_exportaImagen (vv, pth) {
    var bytes = $.model.renderViewAsBase64(vv, "PNG", {
      scale: 1,
      margin: 10
    });
  
    $.fs.writeFile(pth + "/images/" + vv.name.replaceAll(" ", "") + ".png", bytes, "BASE64");
  
    // return _.escape(vv.name);
    return vv.name;
}
