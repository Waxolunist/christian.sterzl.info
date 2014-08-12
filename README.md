christian.sterzl.info
=====================

Personal Website http://christian.sterzl.info

# Building

## Build

Builds and runs the server in normal mode

    grunt

## Developing

For developing run it with 

    DEBUG=true grunt

## Release

Creating a release trigger 

    grunt release

## Updating dependencies

    grunt update

# Server starting

The server needs harmony enabled. Run with 

    node --harmony server.js

The port is chosen by the environment variable LISTEN. You can also specify a unix port for it.
