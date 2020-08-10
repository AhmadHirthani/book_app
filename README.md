# Project Name

**Author**: Ahmad Alhrthani
**Version**: 1.0.0 (increment the patch/fix version number if you make more commits past your first submission)

## Overview
In this app we are to trying to utilize google books API to built a a book application.

## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->

## Architecture
<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->

## Change Log
<!-- Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an examples:

01-01-2001 4:59pm - Application now has a fully-functional express server, with GET and POST routes for the book resource.

## Credits and Collaborations
<!-- Give credit (and a link) to other people or resources that helped you build this application. -->
-->


Number and name of feature: 1. As a user, I want all of my saved books to be displayed on the home page so that I can view all of the books from my collection in a single view.

Estimate of time needed to complete: one hour

Start time: 01:00

Finish time: 02:30

Actual time needed to complete: one hour and a half



Number and name of feature: 2. As a user, I want to request information about a single book so that I can view its additional details and share it by URL.

Estimate of time needed to complete: 1 hours

Start time: 02:30

Finish time: 03:30

Actual time needed to complete: 1 hour



My Schema
CREATE TABLE IF NOT EXISTS
books(
  id SERIAL PRIMARY KEY,
  author VARCHAR(400) NOT NULL ,
  title VARCHAR(400) NOT NULL,
  isbn VARCHAR(400) NOT NULL,
  image_url VARCHAR(400) NOT NULL,
  description TEXT NOT NULL,
  bookshelf VARCHAR(20) NOT NULL
);