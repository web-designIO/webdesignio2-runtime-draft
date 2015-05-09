# webdesignio runtime draft

This is a draft for the new runtime of webdesignio.

## Getting started

Make sure you have docker and docker-compose installed.  Then setup
the project using the following steps:

    $ npm install
    $ make server

This should make the server listen on port 3000.

## Concept

The system sets up worker to handle requests.  It's now able to reload
websites during runtime.
