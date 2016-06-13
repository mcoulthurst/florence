// Import localforage for getting information to do POST - ordinary localStorage doesn't work in service workers
importScripts('/florence/js/third-party/localforage.min.js');

// Post content
function attemptPostContent() {
    new Promise(function(resolve, reject) {
        localforage.iterate(function(value) {
            fetch(value.url, {
                method: 'POST',
                credentials: 'include',
                body: value.data,
                headers: new Headers({
                    'Content-Type': 'application/json;charset=utf-8'
                })
            }).then(function(response) {
                // console.log("Zebedee response: ", response);
                if (response.status === 200) {
                    console.log("Successful post, clear localForage");
                    localforage.clear();
                } else {
                    console.log("Post failed: ", response);
                }
                resolve(response);
            }).catch(function(err) {
                console.log("Error :(");
                reject(err);
            });
        });
    });
}

// Listen for a request to sync content with zebedee
self.addEventListener('sync', function(event) {
    if (event.tag == 'postToApi') {
        event.waitUntil(attemptPostContent());
    }
});
