load(__DIR__ + 'nashorn-polyfills.js');
load(__DIR__ + 'underscore-min.js');
load(__DIR__ + 'marked.min.js');


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

