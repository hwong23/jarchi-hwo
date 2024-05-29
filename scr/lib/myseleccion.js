// Notes with no relationships
function obtNota (theView) {
    var notatexto = '';
    var c = $(theView).find().not("element").not("relationship").first();

    // try {
        if (c) {
            if ($(c).rels().length==0) {
                notatexto = notatexto + c.text + '\n\n';
            }
        };
    // }
    // catch(err) {
    //     console.error(c.name);
    // }

    return notatexto;
}
