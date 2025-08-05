load(__DIR__ + 'nashorn-polyfills.js');
// load(__DIR__ + 'underscore-min.js');
const _ = require(__DIR__ + "underscore-min.js");
const marked = require(__DIR__ + 'marked.min.js');


// Use Mustache.js-style templating
_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
  };
