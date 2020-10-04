# Hello World

A simple web app written in Node.js that you can use for testing.

It reads in an env variable `TARGET` and prints "Hello \${TARGET}! I am at version \${pkg.version}". If TARGET is not specified, it will use "World" as the TARGET.

When env variable `SERVANTS` is set (a comma separated list of paths to query for information) then role 'master' is chosen. Buttons will show to call the servants.
Otherwise role 'servant' is chosen.

When env variable `INFORMANT` is set (a k8s cluster service url), the servant will query it for information and add it to it's report.

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
