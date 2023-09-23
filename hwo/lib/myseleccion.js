// Notes with no relationships
function obtNota (theView) {
    var notatexto = '';
    $(theView).find().not("element").not("relationship").each(function(c) {
        if (c.text) {
            if ($(c).rels().length==0) {
                notatexto += notatexto + c.text + '\n\n';
            }
        };
    })

    return notatexto;
}
