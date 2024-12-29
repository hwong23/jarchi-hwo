// HWO
var argv = Java.type("org.eclipse.core.runtime.Platform").getApplicationArgs()

function myargs_getArgumento (miArg) {
    // índice myArg
    var indice = argv.indexOf('-'+miArg);
    if (indice != -1) { return argv[indice+1] };
}


// Argumentos de entrada por CLI
var argRutaMacMD = getArgumento("rutaMacMD");
var argVistaDocumental = getArgumento("vistaDocumental");
var argRutaCompleta = getArgumento("rutaCompleta");
console.log("Entradas: ")
debug? console.log("   theRutaMacMD: "+argRutaMacMD):true;
debug? console.log("   vistaDocumental: "+argVistaDocumental):true;
debug? console.log("   rutaCompleta: "+argRutaCompleta):true;

