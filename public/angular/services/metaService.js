angular.module('ALapp.services').factory('metaService', function(){
    var metaTitle = 'AugustoLemble';
    var metaDescription = 'Personal website with my works, music, journeys, etc.';
    var metaKeywords = 'Augusto Lemble';
    var ogTitle = "Augusto Lemble .com";
    var ogURL = "";
    var ogDescription = 'Personal website with my works, music, journeys, etc.';  
    return {
        set: function(newTitle, newMetaDescription, newKeywords, newOgTitle, newOgURL, newOgDescription) {
            metaKeywords = newKeywords;
            metaDescription = newMetaDescription;
            metaTitle = newTitle;
            ogTitle = newOgTitle;
            ogURL = newOgURL;
            ogDescription = newOgDescription;  
        },
        metaTitle: function(){ return metaTitle; }, 
        metaDescription: function() { return metaDescription; },
        metaKeywords: function() { return metaKeywords; },
        ogTitle: function(){ return ogTitle; },
        ogURL: function(){ return ogURL; },
        ogDescription: function(){ return ogDescription; },
    }
});