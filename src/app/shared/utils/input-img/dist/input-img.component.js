"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InputImgComponent = void 0;
var core_1 = require("@angular/core");
var InputImgComponent = /** @class */ (function () {
    function InputImgComponent(imageCompress) {
        this.imageCompress = imageCompress;
        this.archivoSeleccionado = new core_1.EventEmitter();
    }
    InputImgComponent.prototype.ngOnInit = function () { };
    InputImgComponent.prototype.change = function (event) {
        var _this = this;
        if (event.target.files.length > 0) {
            var fileName;
            this.file = event.target.files[0];
            fileName = this.file['name'];
            if (event.target.files && event.target.files[0]) {
                var reader = new FileReader();
                reader.onload = function (event) {
                    _this.localUrl = event.target.result;
                    _this.compressFile(_this.localUrl, fileName);
                };
                reader.readAsDataURL(event.target.files[0]);
                this.urlImagenActual = null;
            }
        }
    };
    InputImgComponent.prototype.compressFile = function (image, fileName) {
        var _this = this;
        var orientation = -1;
        this.sizeOfOriginalImage =
            this.imageCompress.byteCount(image) / (1024 * 1024);
        console.warn('Size in bytes is now:', this.sizeOfOriginalImage);
        if (this.sizeOfOriginalImage >= 0.6) {
            this.imageCompress
                .compressFile(image, orientation, 50, 50)
                .then(function (result) {
                _this.imgResultAfterCompress = result;
                _this.localCompressedURl = result;
                _this.sizeOFCompressedImage =
                    _this.imageCompress.byteCount(result) / (1024 * 1024);
                console.warn('Size in bytes after compression:', _this.sizeOFCompressedImage);
                // create file from byte
                var imageName = fileName;
                // call method that creates a blob from dataUri
                _this.imagenBase64 = _this.dataURItoBlob(_this.imgResultAfterCompress.split(',')[1]);
            });
        }
        else {
            this.imageCompress
                .compressFile(image, orientation, 90, 90)
                .then(function (result) {
                _this.imgResultAfterCompress = result;
                _this.localCompressedURl = result;
                _this.sizeOFCompressedImage =
                    _this.imageCompress.byteCount(result) / (1024 * 1024);
                console.warn('Size in bytes after compression:', _this.sizeOFCompressedImage);
                // create file from byte
                var imageName = fileName;
                // call method that creates a blob from dataUri
                _this.imagenBase64 = _this.dataURItoBlob(_this.imgResultAfterCompress.split(',')[1]);
            });
        }
    };
    InputImgComponent.prototype.dataURItoBlob = function (dataURI) {
        var byteString = window.atob(dataURI);
        var arrayBuffer = new ArrayBuffer(byteString.length);
        var int8Array = new Uint8Array(arrayBuffer);
        for (var i = 0; i < byteString.length; i++) {
            int8Array[i] = byteString.charCodeAt(i);
        }
        var blob = new Blob([int8Array], { type: 'image/jpeg' });
        var myFile = new File([blob], "image.jpeg", {
            type: blob.type
        });
        // const imageFile = new File([result], imageName, { type: 'image/jpeg' });
        this.archivoSeleccionado.emit(myFile);
        return blob;
    };
    InputImgComponent.prototype.refreshImage = function () {
        this.urlImagenActual = null;
        this.imgResultAfterCompress = null;
        this.archivoSeleccionado.emit(null);
    };
    __decorate([
        core_1.Input()
    ], InputImgComponent.prototype, "urlImagenActual");
    __decorate([
        core_1.Output()
    ], InputImgComponent.prototype, "archivoSeleccionado");
    InputImgComponent = __decorate([
        core_1.Component({
            selector: 'app-input-img',
            templateUrl: './input-img.component.html',
            styleUrls: ['./input-img.component.scss']
        })
    ], InputImgComponent);
    return InputImgComponent;
}());
exports.InputImgComponent = InputImgComponent;
