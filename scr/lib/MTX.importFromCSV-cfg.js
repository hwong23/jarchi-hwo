// Configuración para importar relaciones desde una matriz CSV.
// Se usa como fallback cuando el CSV no incluye una leyenda con tipos.
const cfg_mtxImportOptions = {
    debug: false,
    rowType: "",
    columnType: "",
    createMissing: true,
    defaultAmbiguousRelationshipType: "aggregation-relationship"
};