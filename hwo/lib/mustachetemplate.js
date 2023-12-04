load(__DIR__ + 'nashorn-polyfills.js');
load(__DIR__ + 'underscore-min.js');
load(__DIR__ + 'marked.min.js');

// funciones con argumento plantillas base 
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

