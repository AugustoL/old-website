angular.module('ALapp.services').factory('metaService', function(){
    var metaTitle = 'AugustoLemble';
    var metaDescription = 'Personal website with my works, music, journeys, etc.';
    var metaKeywords = 'Augusto Lemble';
    return {
        set: function(newTitle, newMetaDescription, newKeywords) {
            metaKeywords = newKeywords;
            metaDescription = newMetaDescription;
            metaTitle = newTitle;
            ogTitle = newOgTitle;
            ogURL = newOgURL;
            ogDescription = newOgDescription;  
        },
        metaTitle: function(){ return metaTitle; }, 
        metaDescription: function() { return metaDescription; },
        metaKeywords: function() { return metaKeywords; }
    }
});