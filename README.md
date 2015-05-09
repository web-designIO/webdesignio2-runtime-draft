# webdesignio runtime draft

This is a draft for the new runtime of webdesignio.

## Getting started

Make sure you have docker and docker-compose installed.  Then setup
the project using the command:

    $ make server

This should install all dependencies and make the server listen on the
address machine.dev:3000.  So you should make sure to setup a local
dns server.  Dnsmasq is pretty simple to setup.  Or use your hosts
file to resolve `machine.dev` to `localhost`.

## Concept

The system sets up worker to handle requests.  It's now able to reload
websites during runtime.
