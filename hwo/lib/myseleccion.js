// Notes with no relationships
function obtNota (theView) {
    $(theView).find().not("element").not("relationship").each(function(c) {
        if (c.text) {
            if ($(c).rels().length==0) {
                console.log (c.text);
            }
        };
    })
}
