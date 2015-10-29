angular.module('ALapp.services').factory('metaService', function(){
  var title = 'AugustoLemble';
  var metaDescription = 'Personal website with my works, music, journeys, etc.';
  var metaKeywords = 'Augusto Lemble';
  return {
    set: function(newTitle, newMetaDescription, newKeywords) {
      metaKeywords = newKeywords;
      metaDescription = newMetaDescription;
      title = newTitle; 
    },
    metaTitle: function(){ return title; }, 
    metaDescription: function() { return metaDescription; },
    metaKeywords: function() { return metaKeywords; }
  }
});