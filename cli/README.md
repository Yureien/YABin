# YABin CLI Client

## Installation

```bash
pip install yabin
```

## Usage

You can specify the `BASE_URL` environment variable to change the default API URL, or use the `-b/--base-url` option.

### Create a paste

```
usage: yabin create [-h] [--encrypted] [--password PASSWORD] [--language LANGUAGE] [--expires-after SECONDS] [--burn-after-read] FILE|stdin

positional arguments:
  FILE|stdin            Content of the paste. If it is stdin, it will be read from stdin

options:
  -h, --help            show this help message and exit
  --encrypted, -e       Encrypt the paste on client-side. Default: False
  --password PASSWORD, -p PASSWORD
                        Password to encrypt the paste with.
  --language LANGUAGE, -l LANGUAGE
                        (Programming) language of the paste. Default: plaintext
  --expires-after SECONDS, -x SECONDS
                        Number of seconds after which the paste will expire.
  --burn-after-read, -b
                        Delete the paste after it has been read once.
```

### Read a paste

```
usage: yabin read [-h] [--password PASSWORD] URL

positional arguments:
  URL                   Complete URL of the paste to read.

options:
  -h, --help            show this help message and exit
  --password PASSWORD, -p PASSWORD
                        Password to decrypt the paste with. Only needed if password-protected.
```