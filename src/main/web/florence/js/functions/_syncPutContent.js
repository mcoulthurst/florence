/**
 *  Sends data to the service worker to sync when a network connection is available
 *  @url - Zebedee path required for sending the POST to
 *  @data - New data to be sent to Zebedee
 **/

// Request a sync with zebedee
function syncContent(url, data) {
    var update = {"url": url, "data": data};
    var storageLength = 0;

    // Use for local storage key to ensure not to overwrite an un-synced update
    localforage.length().then(function(value) {
        storageLength = value;

        // Add to offline local storage for service worker to access to POST
        localforage.setItem('update' + (storageLength+1), update);

        // Register a new sync to Zebedee
        navigator.serviceWorker.ready.then(function(registration) {
            registration.sync.register('postToApi').then(function() {
                console.log('Sync registered');
            });
        });
    });
}

$('body').click(function() {
    // syncContent("/zebedee/content/compendium-3ae86bd6f801bb04a80c36f9b17640fd12c2d4ef772d3a4363d9607089ff1ae6?uri=/businessindustryandtrade/changestobusiness/bankruptcyinsolvency/bulletins/lollerz/2016/data.json&overwriteExisting=true&recursive=undefined", {"relatedBulletins":[],"pdfTable":[],"sections":[{"title":"Sync test","markdown":"Words and stuff"}],"accordion":[],"relatedData":[],"relatedDocuments":[],"charts":[],"tables":[],"images":[],"links":[],"alerts":[],"relatedMethodology":[],"relatedMethodologyArticle":[],"versions":[],"type":"bulletin","uri":"/businessindustryandtrade/changestobusiness/bankruptcyinsolvency/bulletins/lollerz/2016","description":{"title":"lollerz","summary":"","keywords":[],"metaDescription":"","nationalStatistic":false,"latestRelease":true,"contact":{"email":"","name":"","telephone":""},"releaseDate":"2016-06-29T23:00:00.000Z","nextRelease":"","edition":"2016","headline1":"","headline2":"","headline3":"","unit":"","preUnit":"","source":""},"topics":[]});
});

