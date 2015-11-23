---
author: Christian Sterzl
time: 2013 - 2016
name: Sympany App
tags: web mobile ios android jee java vaadin gwt jpa ejb guice guava maven jaxb weblogic soap
site: http://www.sympany.ch/app
summary: Sympany App is the customer portal for the suisse health insurance company Sympany. The app helps customers to stay informed about their insurance policies and benefits. It eases to contact Sympany. A very important feature is to photograph an invoice and upload it instead of sending it by post.
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

The project started in july 2013 and went live with the first release in january 2014, just 5 months later. I worked on it as architect and lead developer together with other intern teams and one extern team.

The focus of the first release was to create a base for further development and new functionality, thus only base functionality were available in this first release. Nonetheless, in my opinion, it was a big achievement to get a running app out into the field, considering the tight schedule.

Following functions were available in this first version:

* **Benefits**: Details billed invoices (medical bills, etc.). and display of cost sharing.
* **Personal information**: View personal data from insuree and its family.
* **My insurances**: Overview of the insurance policies, including premiums and other details.
* **Account information**: View of stored account numbers for payments or premiums loads.

The data was retrieved from the new central ERP, which has been introduced at the end of 2012. Documents and Invoices were retrieved from IBM Filenet. To avoid a tight coupling to these systems and reduce complexity, Oracle SOA Suite has


Photograph and send invoices
Submit your doctors' invoices and reimbursement documents online


We will customize the app continually on client needs.

Tourist Subito is a webapplication to contract a travel insurance fast and uncomplicated, which I have designed and written for Sympany.

The project started in august 2012 and went live with the first release in march 2013. I worked on it as architect and main developer together with another developer and designer.

The goals were to replace the outdated current solution and embedd the application in the new infrastructure, we've built as part of the [portal project](/projects/extranet-sympany).

At the beginning of the project we decided to base the application on Vaadin 7 and JEE5. Vaadin 7 was at this moment still in alpha, but we took the risk considering the long term advantages of developing against the latest features. During the development we invested just a minimum time for upgrading the vaadin versions as they saw the light of the day, which proofed us, that we met the right decision.

After going live we had some time left and implemented a mobile version with Vaadin Touchkit in about three weeks. This version was working, but did not go live until now, because the overall mobile strategy of Sympany was just not yet finished.

This web application is also the prototype for other public web applications in Sympany. It's diverse components such as E-Mail handling, PDF generation, dependency injection, etc. and its architecture as a whole are highly reusable.
