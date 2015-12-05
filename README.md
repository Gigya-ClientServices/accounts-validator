# accounts-validator

An automated node.js script used to validate (JSON lint) the accounts data provided for large Gigya accounts import JSON files.

### Usage

The script can be installed and then called from the command line from inside it's own folder.

```shell
$ ./bin/validate-accounts.js

  Usage: validate-accounts.js [file to validate]
```

### Functionality

When the validation is complete, the tool reports the record counts and last UID read.  If an error is encountered while trying to parse the file, the same data is returned so it can be used to debug the file.

### Sample Output

Below you can find some sample output:

```
Validating xag_test.json
========================

Records Read: 200000
Last Record Read: scentre-6836194
```
