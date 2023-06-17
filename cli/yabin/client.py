from typing import Optional
from urllib.parse import quote, unquote

import requests

from . import crypto


class PasteClient:
    def __init__(self, base_url: str):
        self.base_url = base_url
        self.api_url = f"{self.base_url}/api"
        self.paste_url = f"{self.api_url}/paste"

    def __repr__(self) -> str:
        return f"<PasteClient base_url={self.base_url}>"

    def __str__(self) -> str:
        return f"<PasteClient base_url={self.base_url}>"

    def _make_paste_url(self, paste_id: str, key: str = None) -> str:
        keyStr = f"#{quote(key)}" if key else ""
        return f"{self.base_url}/{paste_id}{keyStr}"

    def create(
        self,
        content: str,
        *,
        language: str = "plaintext",
        encrypt: bool = False,
        password: Optional[str] = None,
        expires_after_seconds: Optional[int] = None,
        burn_after_read: Optional[bool] = False,
    ) -> str:
        initVector = None
        key = None
        if encrypt and not password:
            crypt = crypto.encrypt(content)
            content = crypt["ciphertext"]
            initVector = crypt["iv"]
            key = crypt["key"]

        if password:
            encrypt = True
            crypt = crypto.encrypt_with_password(content, password)
            content = crypt["ciphertext"]
            initVector = crypt["iv"]

        body = {
            "content": content,
            "passwordProtected": not not password,
            "initVector": initVector,
            "config": {
                "language": language,
                "encrypted": encrypt,
                "expiresAfter": expires_after_seconds,
                "burnAfterRead": burn_after_read,
            },
        }

        response = requests.post(self.paste_url, json=body).json()
        if not response["success"]:
            raise Exception(response["error"])

        paste_key = response["data"]["key"]

        return self._make_paste_url(paste_key, key)

    def get(
        self,
        paste_id: str,
        *,
        key: Optional[str] = None,
        password: Optional[str] = None,
    ) -> str:
        response = requests.get(f"{self.paste_url}?key={paste_id}").json()
        if not response["success"]:
            raise Exception(response["error"])

        data = response["data"]
        content = data["content"]
        encrypted = data["encrypted"]
        password_protected = data["passwordProtected"]
        init_vector = data["initVector"]

        if not encrypted:
            return content

        if encrypted and not password_protected:
            if not key:
                raise ValueError("Key required")

            return crypto.decrypt(content, init_vector, key)

        if password_protected:
            if not password:
                raise ValueError("Password required")

            return crypto.decrypt_with_password(content, init_vector, password)

        raise ValueError("Failed sanity check, how did we get here?")

    def get_from_url(self, url: str, *, password: Optional[str] = None) -> str:
        if not url.startswith(self.base_url):
            raise ValueError("Invalid URL")

        key_data = url[len(self.base_url) + 1 :]
        if "#" in key_data:
            paste_id, key = key_data.split("#")
            key = unquote(key)
        else:
            paste_id = key_data
            key = None

        return self.get(paste_id, key=key, password=password)
