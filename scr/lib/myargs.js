// HWO
var argv = Java.type("org.eclipse.core.runtime.Platform").getApplicationArgs()

function getArgumento (miArg) {
    // índice myArg
    var indice = argv.indexOf('-'+miArg);
    if (indice != -1) { return argv[indice+1] };
}

