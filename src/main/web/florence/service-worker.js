

// Import localforage for getting information to do POST - ordinary localStorage doesn't work in service workers
importScripts('/florence/js/third-party/localforage.min.js');

// Post content
function attemptPostContent() {
    new Promise(function(resolve, reject) {
        var storageLength = 0;
        console.log(storageLength);
        localforage.length().then(function(value) {
            storageLength = value;
            console.log(storageLength);

            for (var i = 0; i < storageLength; i++) {
                localforage.getItem('update' + i).then(function(response) {
                    fetch(response.url, {
                        method: 'post',
                        credentials: 'include',
                        body: JSON.stringify(response.data)
                    }).then(function(response) {
                        console.log("Success :)");
                        resolve(response);
                    }).catch(function(err) {
                        console.log("Error :(");
                        reject(err);
                    });
                });
            }
        });
    });
}

// Listen for a request to sync content with zebedee
self.addEventListener('sync', function(event) {
    if (event.tag == 'postToApi') {
        event.waitUntil(attemptPostContent());
        console.log('aarrgghhh');
    }
});
