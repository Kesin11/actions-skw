# GitHub Actions for SkyWarehouse(skw)

This repository has some of actions for [SkyWarehouse](https://github.com/Kesin11/SkyWarehouse)

## actions-skw/skw
It just simple wrapper of `skw` command.

### upload

```yaml
- uses: actions/setup-java@v2
- uses: Kesin11/actions-skw/skw@v1
  with:
    skw-version: v0.2.0
    command: upload
    bucket: gs://YOUR_GCS_BUCKET
    key: ARTIFACT_KEY
    tags: |
      ${{ github.run_number }}
      latest
    prefix: skw
    paths: |
      path/to/upload_file.txt
      path/to/dir
```

### download

```yaml
- uses: actions/setup-java@v2
- uses: Kesin11/actions-skw/skw@v1
  with:
    skw-version: v0.2.0
    command: download
    bucket: gs://YOUR_GCS_BUCKET
    key: ARTIFACT_KEY
    tags: latest
    paths: path/to/download/dir
```

----

## Code in Main
Install the dependencies  
```bash
$ npm install
```

Build the typescript and package it for distribution
```bash
$ npm run build && npm run package
```

Run the tests :heavy_check_mark:  
```bash
$ npm test

 PASS  ./index.test.js
  ✓ throws invalid number (3ms)
  ✓ wait 500 ms (504ms)
  ✓ test runs (95ms)

...
```

## Publish to a distribution branch

Actions are run from GitHub repos so we will checkin the packed dist folder. 

Then run [ncc](https://github.com/zeit/ncc) and push the results:
```bash
$ npm run package
$ git add dist
$ git commit -a -m "prod dependencies"
$ git push origin releases/v1
```

Note: We recommend using the `--license` option for ncc, which will create a license file for all of the production node modules used in your project.

Your action is now published! :rocket: 

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)
