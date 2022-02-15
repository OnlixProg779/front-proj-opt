import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-input-img',
  templateUrl: './input-img.component.html',
  styleUrls: ['./input-img.component.scss'],
})
export class InputImgComponent implements OnInit {
  constructor(private imageCompress: NgxImageCompressService) {}

  imagenBase64: Blob;

  @Input()
  public urlImagenActual: string;

  @Output()
  archivoSeleccionado: EventEmitter<File> = new EventEmitter<File>();

  ngOnInit(): void {}

  file: any;
  localUrl: any;
  localCompressedURl: any;
  sizeOfOriginalImage: number;
  sizeOFCompressedImage: number;

  change(event) {
    if (event.target.files.length > 0) {

      var fileName: any;
      this.file = event.target.files[0];
      fileName = this.file['name'];
      if (event.target.files && event.target.files[0]) {

        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.localUrl = event.target.result;
          this.compressFile(this.localUrl, fileName);
        };
        reader.readAsDataURL(event.target.files[0]);
        this.urlImagenActual = null;
      }
    }
  }

  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;

  compressFile(image, fileName) {
    var orientation = -1;
    this.sizeOfOriginalImage =
      this.imageCompress.byteCount(image) / (1024 * 1024);
    console.warn('Size in bytes is now:', this.sizeOfOriginalImage);
    if(this.sizeOfOriginalImage >= 0.6 ){
      this.imageCompress
      .compressFile(image, orientation, 50, 50)
      .then((result) => {
        this.imgResultAfterCompress = result;
        this.localCompressedURl = result;
        this.sizeOFCompressedImage =
          this.imageCompress.byteCount(result) / (1024 * 1024);
        console.warn(
          'Size in bytes after compression:',
          this.sizeOFCompressedImage
        );
        // create file from byte
        const imageName = fileName;
        // call method that creates a blob from dataUri
        this.imagenBase64 = this.dataURItoBlob(
          this.imgResultAfterCompress.split(',')[1]
        );
      });
    }else{
      this.imageCompress
      .compressFile(image, orientation, 90, 90)
      .then((result) => {
        this.imgResultAfterCompress = result;
        this.localCompressedURl = result;
        this.sizeOFCompressedImage =
          this.imageCompress.byteCount(result) / (1024 * 1024);
        console.warn(
          'Size in bytes after compression:',
          this.sizeOFCompressedImage
        );
        // create file from byte
        const imageName = fileName;
        // call method that creates a blob from dataUri
        this.imagenBase64 = this.dataURItoBlob(
          this.imgResultAfterCompress.split(',')[1]
        );
      });
    }
  
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });

    const myFile = new File([blob], "image.jpeg", {
      type: blob.type,
    });
    // const imageFile = new File([result], imageName, { type: 'image/jpeg' });
    this.archivoSeleccionado.emit(myFile);
    return blob;
  }

  refreshImage(){
    this.urlImagenActual = null
    this.imgResultAfterCompress = null
    this.archivoSeleccionado.emit(null);
  }
}
 