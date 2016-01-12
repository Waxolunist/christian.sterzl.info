---
author: Christian Sterzl
time: 2015
name: ImageConverter
tags: python opencv rest flask
summary: To process photographs of invoices made with the Sympany App efficiently, the uploaded photographs had to be converted before sending to the OCR enging. Therefore the microservice "ImageConverter" was developed. 
draft: true
---

# ImageConverter

The ImageConverter is a microservice used for preprocessing images to gather optimal text recognition results.

The microservice gets called after a user uploads a photograph from the [Sympany App](projects/sympanyapp). After a manual review of the processed image the image could be forwared to the OCR engine.

The ImageConverter was written in python and used [OpenCV](http://opencv.org) as image processing library. It had following features implemented:

* Edge detection
* Shadow removal
* Contrast normalization
* Binary thresholding
* 3D perspective transformation
* Scaling
* Multipage tiff output

Other features are thumbnail generation and a text to image converter.
