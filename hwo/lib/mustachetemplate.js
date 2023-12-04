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

var tplDocumentation;
var tplMainReport = _.template(readFully(__DIR__ + '../templates/newmain-report-md.tpl', 'UTF-8'));
var tplViewTitle = _.template(readFully(__DIR__ + '../templates/view-title-md.tpl', 'UTF-8'));
var tplViewDiagram = _.template(readFully(__DIR__ + '../templates/view-diagram-md.tpl', 'UTF-8'));
var tplElement = function() {};
var tplElementFila = function() {};
var tplRelationship = _.template(readFully(__DIR__ + '../templates/relationship.tpl', 'UTF-8'));


// Use Mustache.js-style templating
_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
  };


// Set Markdown rendering options
var mdOptions = {
  gfm: true,
  breaks: true,
  smartLists: true,
  smartypants: true
};
