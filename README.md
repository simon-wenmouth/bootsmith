
# bootsmith

"bootsmith" is a demonstration project using Bootstrap and Metalsmith with build automation by Grunt.

## installation

```bash

    git clone git@github.com:simon-wenmouth/bootsmith.git

    cd bootsmith

    npm install

    bower install

```

### build instructions

```bash

    grunt

    node .

```

if you want minified css use

```bash

    grunt release

    node .

```

## demonstration

Please see this [projects github pages](http://simon-wenmouth.github.io/bootsmith/).

## motivation

I wanted to create a static site with the simplest tools possible.

To add an article simply:
- add a markdown document in the \_posts directory
- run `grunt`

The resulting \_site directory can be copied to your AWS S3 bucket (for the win).

## license

Please see the file [LICENSE.txt](LICENSE.txt)

## author

Simon Wenmouth

