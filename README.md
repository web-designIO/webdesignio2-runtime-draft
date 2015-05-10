# webdesignio runtime draft

This is a draft for the new runtime of webdesignio.  This is really
just an experimentation platform to try out new features for the new
version.

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

### Creating a website

A website is currently nothing but a node module with exposes an
express application.  Just place it under `websites/<you-site>` and
add it to the hash at the top of the file `lib/website_store.js` with
a domain.
