import { Component } from '@angular/core';
import { BlobsService } from '../blobs.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  username: string = localStorage.getItem("username") || "";
  blobs: any[] = [];
  file: any;
  newBlob: any;
  blobId: string = "";

  constructor(public blobsService: BlobsService, private router: Router) {}

  ngOnInit(): void {
    if (!localStorage.getItem("token")) {
      this.router.navigate(["/login"]);
    }
  
    this.refresh();
  }

  getBlobs() {
    this.blobsService.getBlobs().subscribe({
      next: (data: any) => {
        this.blobs = data.blobs;
        for (let blob of this.blobs) {
          this.blobsService.getVisibility(blob.blobId).subscribe({
            next: (data: any) => {
              blob.visibility = data.visibility;
            }
          });
        }
      },
      error: (error: any) => {
        if (error.status === 401) {
          this.logout();
        }
      }
    });
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    location.reload();
  }

  refresh() {
    this.getBlobs();
  }

  getBlob(blobId: any) {
    return {"blobId": blobId};
  }

  download(blob: any) {
    if (blob.blobId === undefined || blob.blobId === null || blob.blobId === "") {
      return;
    }

    this.blobsService.download(blob.blobId).subscribe({
      next: (data: any) => {
        let _blob = new Blob([data], { type: 'application/octet-stream' });
        let url = window.URL.createObjectURL(_blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = blob.blobId;
        a.click();
      },
      error: (error: any) => {
        if (error.status === 401) {
          this.logout();
        } else {
          alert("Requested blob not found");
        }
      }
    });
  }

  delete(blob: any) {
    this.blobsService.delete(blob.blobId).subscribe({
      next: (data: any) => {
        this.refresh();
      },
      error: (error: any) => {
        if (error.status === 401) {
          this.logout();
        }
      }
    });
  }

  async upload() {
    if (!this.file) {
      return;
    }

    this.blobsService.newBlob().subscribe({
      next: (data: any) => {
        this.newBlob = data;
        this.blobsService.update(this.newBlob.blobId, this.file).subscribe({
          next: (data: any) => {
            this.refresh();
          },
          error: (error: any) => {
            if (error.status === 401) {
              this.logout();
            }
          }
        });
      }
    });
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  changeVisibility(blob: any) {
    let visibility = blob.visibility === "public" ? "private" : "public";
    this.blobsService.changeVisibility(blob.blobId, visibility).subscribe({
      next: (data: any) => {
        this.refresh();
      },
      error: (error: any) => {
        if (error.status === 401) {
          this.logout();
        }
      }
    });
  }
}
