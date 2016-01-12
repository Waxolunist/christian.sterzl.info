---
author: Christian Sterzl
time: 2013 - 2016
name: Sympany App
tags: web mobile ios android jee java vaadin gwt jpa ejb guice guava maven jaxb weblogic soap angularjs
site: http://www.sympany.ch/app
summary: Sympany App is the customer portal for the suisse health insurance company Sympany. The app helps customers to stay informed about their insurance policies and benefits. It eases to contact Sympany. A very important feature is to photograph an invoice and upload it instead of sending it by post.
draft: true
---

<carousel> 
  <carousel-item ng-attr-src="/assets/projects/sympanyapp/main.jpeg"></carousel-item>
  <carousel-item ng-attr-src="/assets/projects/sympanyapp/benefits.jpeg"></carousel-item>
  <carousel-item ng-attr-src="/assets/projects/sympanyapp/insurances.jpeg"></carousel-item>
  <carousel-item ng-attr-src="/assets/projects/sympanyapp/photograph.jpeg"></carousel-item>
  <carousel-item ng-attr-src="/assets/projects/sympanyapp/account.jpeg"></carousel-item>
</carousel>


# Sympany App

Sympany App is the customer portal for the suisse health insurance company Sympany. The app helps customers to stay informed about their insurance policies and benefits. It eases to contact Sympany. A very important feature is to photograph an invoice and upload it instead of sending it by post.

## First major release

The project started in july 2013 and went live with the first release in january 2014, just 5 months later. I worked on it as architect and lead developer together with other intern teams and one extern team.

The focus of the first release was to create a base for further development and new functionality, thus only base functionality were available in this first release. Nonetheless, in my opinion, it was a big achievement to get a running app out into the field within such a short timeframe.

Following functions were available in this first version:

* **Benefits**: Details billed invoices (medical bills, etc.) and display of cost sharing.
* **Personal information**: View personal data from insuree and its family.
* **My insurances**: Overview of the insurance policies, including premiums and other details.
* **Account information**: View of stored account numbers for payments or premiums loads.

The data was retrieved from the new central ERP, which has been introduced at the end of 2012. Documents and Invoices were retrieved from IBM Filenet. To avoid a tight coupling to these systems and reduce complexity, Oracle SOA Suite has been used as mediator between the app and the backend systems. All services have been developed during this first 5 months as well.

Besides the application itself and the backend services 3 more applications were developed. These are:

* Administration Interface
* Login Application
* Public REST API

The Administration Interface was developed using the same java frameworks as the application itself. It was used for registering and administering users and communicating with them, statistics, configuration of the app and maintenance tasks. 

The Login Application is a small mobile enabled RESTful clientside application for login, logout, password management and registration. This application hooks into the authentication server, which was already in place at Sympany. The authentication server uses Microsoft Active Directory as a backend for user accounting. The application was written with Angular JS.

The public REST API provides services for registration (used by the login application), version information and maintenance information for the user.

The web application is based on the internal web framework developed during the project [Tourist Subito](/projects/tourist) on top of Vaadin 7 and JEE5. The mobile application clients for iOS and Android are packaged with Phonegap / Cordova.

## Second major release

End of October, 2015, we published the next big release of the application. In the year before the development of the application was fully internalized and continued with a very small team of around three developers. During that year we built up a new development environment with a complete CI/CD pipeline, switching from SVN to Git and Jenkins to TeamCity. Furthermore we were working on new features, performance, monitoring and overall quality.

The biggest feature developed for that new version was "Photograph and send invoices". Thus, the user could photograph invoices and send them online. This new feature turned the established core processes of processing invoices upside down, thus the long time between the two releases.

To process the images efficiently through the OCR Engine in place, the photographs had to be converted after uploading and before sending to the OCR server.
Therefore the microservice "ImageConverter" was developed. 

## Success

By the end of 2015 the application had around 3000 users covering about 5000 customers. The app was daily used by between 200 and 1000 users.

In the year 2015 around 150 000 push notifications were sent out.

During 2015 the app made it several times into the top 5 iOS applications in the category "Finances - Free - Switzerland" and was several times number 1 in that category.




The ImageConverter was written in python and used [OpenCV](http://opencv.org) as image processing library. It had following features implemented:

* Edge detection
* Shadow removal
* Contrast normalization
* Black and White thresholding
* 3D perspective transformation
* Scaling
* Multipage tiff output

into black and white images.
