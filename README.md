# Amelia

Minimal bare-bones console RSS reader powered by Node.js

## Installation

[sudo] npm install -g amelia

## Usage

 - Adding a feed:

   `amelia add techcrunch http://techcrunch.com/rssfeeds`

   Aliases:
	`new`

 - List all feeds:

   `amelia list`

   Aliases:
	`all`

 - Read a feed:

   `amelia read techcrunch`

   Aliases:
	`r`, `get`, `fetch`

 - Removing a feed:

   `amelia purge techcrunch`

   Aliases:
	`del`, `remove`, `rm`

## Prerequisites:

You should have a mongodb instance running on default port.

## Acknowledgements:

 - Amelia borrows code and concept from https://github.com/yeexel/node-reader
