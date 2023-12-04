load(__DIR__ + 'nashorn-polyfills.js');
load(__DIR__ + 'underscore-min.js');
load(__DIR__ + 'marked.min.js');

// funciones con argumento plantillas base 
var tplMainReport = _.template(readFully(__DIR__ + '../templates/main-report.html', 'UTF-8'));
var tplVisibilityRuleBold = _.template(readFully(__DIR__ + '../templates/visibility-rule-bold.tpl', 'UTF-8'));
var tplVisibilityRuleReveal = _.template(readFully(__DIR__ + '../templates/visibility-rule-reveal.tpl', 'UTF-8'));
var tplInputCheckbox = _.template(readFully(__DIR__ + '../templates/input-checkbox.tpl', 'UTF-8'));
var tplTreeView = _.template(readFully(__DIR__ + '../templates/model-tree-view.tpl', 'UTF-8'));
var tplTreeFolder = _.template(readFully(__DIR__ + '../templates/model-tree-folder.tpl', 'UTF-8'));
var tplViewTitle = _.template(readFully(__DIR__ + '../templates/view-title.tpl', 'UTF-8'));
var tplViewDiagram = _.template(readFully(__DIR__ + '../templates/view-diagram.tpl', 'UTF-8'));
var tplDocumentation = _.template(readFully(__DIR__ + '../templates/documentation.tpl', 'UTF-8'));
var tplElement = _.template(readFully(__DIR__ + '../templates/element.tpl', 'UTF-8'));
var tplRelationship = _.template(readFully(__DIR__ + '../templates/relationship.tpl', 'UTF-8'));

// Use Mustache.js-style templating
_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
  };

// acumuladores de contenido
var visibilityRulesBold = '';
var visibilityRulesReveal = '';
var inputCheckbox = '';
var treeFolder = '';
var treeContent = '';
var viewTitles =  '';
var viewDiagrams = '';
var viewDocumentations = '';
var viewsIdsByConceptId = {};
var elements = '';
var elementsCollection;
var relationships = '';
var relationshipsCollection;
var debug = true;
