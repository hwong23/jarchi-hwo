// HWO
var argv = Java.type("org.eclipse.core.runtime.Platform").getApplicationArgs()

function myargs_getArgumento (miArg) {
    // índice myArg
    var indice = argv.search('-'+miArg);
    if (indice != -1) { return argv[indice+1] };
}

