# Deep Slumber Frontend

## Contents
This repository contains the frontend VueJS implementation for my semester term project at FFHS (see complete Project: ...).

## Installation

### Prerequisites

In order for the frontend setup to work, you need to install `nodejs` and `npm`.

### Setup

#### NPM Dependencies
Once you cloned this repository, run the following command in the frontend main directory to install the npm dependencies:

```bash
$ npm install
```
### Run for development
The VueJS components can be transpiled in real-time for development via Webpack like so:

```bash
$ npm run watch
``` 

This will watch all source files in the `vuejs` directory, transpile any files that change and output the
transpiled version in the `assets/dev`-directory.

### Run for production
For production, use the following npm command to build the optimized bundle:


```bash
$ npm run build-prod
```

That's it.