---
author: Christian Sterzl
time: 2013 - 2016
name: Sympany App
tags: web mobile ios android jee java vaadin gwt jpa ejb guice guava maven jaxb weblogic soap angularjs
site: http://www.sympany.ch/app
summary: Sympany App is the customer portal for the suisse health insurance company Sympany. The app helps customers to stay informed about their insurance policies and benefits. It eases the contact with Sympany. A very important feature is to photograph an invoice and upload it instead of sending it by mail.
---

<carousel> 
  <carousel-item ng-attr-src="/assets/projects/sympanyapp/main.jpeg"></carousel-item>
  <carousel-item ng-attr-src="/assets/projects/sympanyapp/benefits.jpeg"></carousel-item>
  <carousel-item ng-attr-src="/assets/projects/sympanyapp/insurances.jpeg"></carousel-item>
  <carousel-item ng-attr-src="/assets/projects/sympanyapp/photograph.jpeg"></carousel-item>
  <carousel-item ng-attr-src="/assets/projects/sympanyapp/account.jpeg"></carousel-item>
  <carousel-item ng-attr-src="/assets/projects/sympanyapp/charts.jpeg"></carousel-item>
</carousel>


# Sympany App

The Sympany App is the customer portal for the suisse health insurance company Sympany. The app helps customers to stay informed about their insurance policies and benefits. It eases the contact with Sympany. A very important feature is the possibility to photograph an invoice and upload it instead of sending it by mail.

## First major release

The project started in july 2013 and went live with the first release in january 2014, just 5 months later. I worked on it as an architect and lead developer together with other internal teams and one external team.

The focus of the first release was to create a base for further development and new functionalities, thus only basic functionalities were available in this first release. Nonetheless, it was a big achievement to get a running app out into the field within such a short timeframe.

Following functions were available in this first version:

* **Benefits**: Details on billed invoices (medical bills, etc.) and display of cost sharing.
* **Personal information**: View personal data from insuree and family members.
* **My insurances**: Overview of insurance policies, including premiums and other details.
* **Account information**: View of stored account numbers for payments or premium loads.

The data was retrieved from the new central ERP, which had been introduced at the end of 2012. Documents and invoices were retrieved from IBM Filenet. To avoid a tight coupling to these systems and to reduce complexity, Oracle SOA Suite was used as mediator between the app and the backend systems. All services had been developed during this first 5 months as well.

Besides the application itself and the backend services, 3 more applications were developed. These are:

* [Administration Interface](/projects/sympanyapp-admin)
* Login Application
* Public REST API

The Administration Interface was developed using the same java frameworks as the application itself. Back then, it was used for registering and administering users and communicating with them, displaying statistics, configuration of the app and maintenance tasks. 

The Login Application is a small mobile enabled RESTful clientside application for login, logout, password management and registration. This application hooks into the authentication server, which was already in place at Sympany. The authentication server uses Microsoft Active Directory as a backend for user accounting. The application was written with Angular JS.

The public REST API provides services for registration (used by the login application), version information and maintenance information for the user.

The web application is based on the internal web framework developed during the project [Tourist Subito](/projects/tourist) on top of Vaadin 7 and JEE5. The mobile application clients for iOS and Android are packaged with Phonegap / Cordova.

## Second major release

At the end of October, 2015, we published the next big application release. In the year before the release, the development of the application was fully internalized and continued with a very small team of about three developers. During that year we built a new development environment with a complete CI/CD pipeline, switching from SVN to Git and Jenkins to TeamCity. Furthermore, we were working on new features, performance enhancements, monitoring and overall quality.

The biggest feature developed for that new version was the possibility to "Photograph and send invoices". This enables the user to photograph invoices and send them online. This new feature turned the established core processes of handling invoices upside down, thus the long time between the two releases.

To process the images efficiently through the OCR Engine in place, the photographs had to be converted after uploading and before sending them to the OCR server.
Therefore the microservice "[ImageConverter](/projects/imageconverter)" was developed. 

## Success

By the end of 2015, the application had around 15000 users covering about 28000 customers. The app was daily used by between 200 and 1000 users.

In the year 2015, around 150 000 push notifications were sent out.

During 2015, the app repeatedly made it into the top 5 iOS applications in the category "Finances - Free - Switzerland" and was number 1 in that category several times.

