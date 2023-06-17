import argparse
import os
import sys

from .client import PasteClient


def create_arg_parser():
    base_url = os.environ.get("BASE_URL", "https://bin.sohamsen.me")

    parser = argparse.ArgumentParser(
        prog="yabin",
        description="A command line interface for yabin, a minimalistic but feature-rich pastebin.",
    )

    base_url_group = parser.add_mutually_exclusive_group(required=not base_url)
    base_url_group.add_argument(
        "--base-url",
        "-b",
        metavar="URL",
        default=base_url,
        help=f"Server base URL. Overrides BASE_URL environment variable if provided. Default: {base_url}",
    )

    subparsers = parser.add_subparsers(
        title="Subcommands", help="sub-command help", dest="command"
    )

    create_parser = subparsers.add_parser("create", help="Create a new paste.")
    create_parser.add_argument(
        "--encrypted",
        "-e",
        action="store_true",
        help="Encrypt the paste on client-side. Default: False",
    )
    create_parser.add_argument(
        "--password",
        "-p",
        metavar="PASSWORD",
        help="Password to encrypt the paste with.",
    )
    create_parser.add_argument(
        "--language",
        "-l",
        metavar="LANGUAGE",
        default="plaintext",
        help="(Programming) language of the paste. Default: plaintext",
    )
    create_parser.add_argument(
        "--expires-after",
        "-x",
        metavar="SECONDS",
        type=int,
        help="Number of seconds after which the paste will expire.",
    )
    create_parser.add_argument(
        "--burn-after-read",
        "-b",
        action="store_true",
        help="Delete the paste after it has been read once.",
    )
    create_parser.add_argument(
        "file",
        metavar="FILE|stdin",
        help="Content of the paste. If it is stdin, it will be read from stdin",
    )

    read_parser = subparsers.add_parser("read", help="Read an existing paste.")
    read_parser.add_argument(
        "--password",
        "-p",
        metavar="PASSWORD",
        help="Password to decrypt the paste with. Only needed if password-protected.",
    )

    read_parser.add_argument(
        "url",
        metavar="URL",
        help="Complete URL of the paste to read.",
    )

    return parser


def create_paste(client: PasteClient, args):
    content = None

    if args.file == "stdin":
        content = sys.stdin.read()
    else:
        print(args.file)
        try:
            with open(args.file, "r") as f:
                content = f.read()
        except Exception as e:
            print(f"error: {e}", file=sys.stderr)
            return

    if not content:
        print("error: File is empty.", file=sys.stderr)
        return

    try:
        paste_url = client.create(
            content,
            encrypt=args.encrypted,
            password=args.password,
            language=args.language,
            expires_after_seconds=args.expires_after,
            burn_after_read=args.burn_after_read,
        )
        print(paste_url)
    except Exception as e:
        print(f"error: {e}", file=sys.stderr)
        return

    pass


def read_paste(client: PasteClient, args):
    url = args.url
    if not url.startswith(client.base_url):
        print(
            f"error: Invalid URL: {url}. Must be from {client.base_url}.",
            file=sys.stderr,
        )
        return

    try:
        content = client.get_from_url(url, password=args.password)
        print(content)
    except Exception as e:
        print(f"error: {e}", file=sys.stderr)
        return


def cli():
    parser = create_arg_parser()
    args = parser.parse_args()

    client = PasteClient(args.base_url)

    if args.command == "create":
        return create_paste(client, args)
    if args.command == "read":
        return read_paste(client, args)

    if args.command:
        print("error: Invalid command.\n", file=sys.stderr)
    parser.print_help(sys.stderr)


if __name__ == "__main__":
    cli()
