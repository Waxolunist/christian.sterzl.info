---
author: Christian Sterzl
time: 2015
name: ImageConverter
tags: python opencv rest flask
summary: To process photographs of invoices made with the Sympany App efficiently, the uploaded photographs had to be converted before sending them to the OCR engine. Therefore the microservice "ImageConverter" was developed. 
---

<carousel> 
  <carousel-item ng-attr-src="/assets/projects/imageconverter/original1.png"></carousel-item>
  <carousel-item ng-attr-src="/assets/projects/imageconverter/result1.png"></carousel-item>
</carousel>

# ImageConverter

The ImageConverter is a microservice used for preprocessing images to gather optimal text recognition results.

The microservice gets called after a user uploads a photograph from the [Sympany App](projects/sympanyapp). After a manual review of the processed image the image can be forwared to the OCR engine.

The ImageConverter is written in python and uses the open source library [OpenCV](http://opencv.org) for morphological transformations. Among others, the following functions were implemented:

* Edge detection
* Shadow removal
* Contrast normalization
* Binary thresholding
* 3D perspective transformation
* Scaling
* Multipage tiff output

Other features are thumbnail generation, text to image conversion and a function to merge several tiff images into one multipage tiff. The results can be seen above.
