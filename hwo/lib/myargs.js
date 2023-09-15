// HWO
var argv = Java.type("org.eclipse.core.runtime.Platform").getApplicationArgs()

// for (let j = 0; j < argv.length; j++) {
//     console.log(j + ' -> ' + (argv[j]));
// }

function getArgumento (miArg) {
    // índice myArg
    const indice = argv.indexOf('-'+miArg);
    // console.log('myArg: ' + indice + ' -> ' + argv[indice+1]);
    if (indice != -1) { return argv[indice+1]};
}

