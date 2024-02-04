import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class BlobsService {

    constructor(private httpClient : HttpClient) {}

    getBlobs() {
        let token = localStorage.getItem("token");

        return this.httpClient.get(
            "http://blobs.apiweb.com/api/v1/blobs/",
            {
                headers: {
                    "AuthToken": token || ""
                }
            }
        );
    }

    update(id: string, blob: any) {
        let token = localStorage.getItem("token");

        return this.httpClient.put(
            "http://blobs.apiweb.com/api/v1/blobs/" + id,
            blob,
            {
                headers: {
                    "AuthToken": token || ""
                }
            }
        );
    }

    newBlob() {
        let token = localStorage.getItem("token");

        return this.httpClient.post(
            "http://blobs.apiweb.com/api/v1/blobs/",
            null,
            {
                headers: {
                    "AuthToken": token || ""
                }
            }
        );
    }

    download(blobId: any) {
        let token = localStorage.getItem("token");

        return this.httpClient.get(
            "http://blobs.apiweb.com/api/v1/blobs/" + blobId,
            {
                headers: {
                    "AuthToken": token || ""
                },
                responseType: "arraybuffer"
            }
        );
    }

    delete(blobId: any) {
        let token = localStorage.getItem("token");

        return this.httpClient.delete(
            "http://blobs.apiweb.com/api/v1/blobs/" + blobId,
            {
                headers: {
                    "AuthToken": token || ""
                }
            }
        );
    }

    getVisibility(blobId: any) {
        let token = localStorage.getItem("token");

        return this.httpClient.get(
            "http://blobs.apiweb.com/api/v1/blobs/" + blobId + "/visibility",
            {
                headers: {
                    "AuthToken": token || ""
                }
            }
        );
    }

    changeVisibility(blobId: any, visibility: any) {
        let token = localStorage.getItem("token");

        return this.httpClient.put(
            "http://blobs.apiweb.com/api/v1/blobs/" + blobId + "/visibility",
            { visibility: visibility },
            {
                headers: {
                    "AuthToken": token || ""
                }
            }
        );
    }
}
