from Crypto.Cipher import AES
from Crypto.Hash import SHA512
from Crypto.Protocol.KDF import PBKDF2
from Crypto.Random import get_random_bytes
from base64 import b64encode, b64decode


def encrypt(plaintext: str):
    key = get_random_bytes(32)  # generate a 256-bit key
    cipher = AES.new(key, AES.MODE_GCM)
    ciphertext, tag = cipher.encrypt_and_digest(plaintext.encode())

    return {
        "ciphertext": b64encode(ciphertext + tag).decode("utf-8"),
        "iv": b64encode(cipher.nonce).decode("utf-8"),
        "key": b64encode(key).decode("utf-8"),
    }


def decrypt(ciphertext: str, iv: str, key: str):
    ciphertextTag = b64decode(ciphertext)
    tag = ciphertextTag[-16:]
    ciphertext = ciphertextTag[:-16]

    cipher = AES.new(key=b64decode(key), mode=AES.MODE_GCM, nonce=b64decode(iv))
    plaintext = cipher.decrypt(ciphertext)

    try:
        cipher.verify(tag)
    except ValueError:
        raise ValueError("Key incorrect or message corrupted")

    return plaintext.decode("utf-8")


def encrypt_with_password(plaintext: str, password: str):
    hasher = SHA512.new()
    hasher.update(password.encode("utf-8"))
    salt = hasher.digest()

    key = PBKDF2(password, salt, dkLen=32, count=310000, hmac_hash_module=SHA512)
    cipher = AES.new(key, AES.MODE_GCM)
    ciphertext, tag = cipher.encrypt_and_digest(plaintext.encode())

    return {
        "ciphertext": b64encode(ciphertext + tag).decode("utf-8"),
        "iv": b64encode(cipher.nonce).decode("utf-8"),
    }


def decrypt_with_password(ciphertext: str, iv: str, password: str):
    ciphertextTag = b64decode(ciphertext)
    tag = ciphertextTag[-16:]
    ciphertext = ciphertextTag[:-16]

    hasher = SHA512.new()
    hasher.update(password.encode("utf-8"))
    salt = hasher.digest()

    key = PBKDF2(
        password,
        salt,
        dkLen=32,
        count=310000,
        hmac_hash_module=SHA512,
    )

    cipher = AES.new(key, AES.MODE_GCM, nonce=b64decode(iv))
    plaintext = cipher.decrypt(ciphertext)

    try:
        cipher.verify(tag)
    except ValueError:
        raise ValueError("Password incorrect or message corrupted")

    return plaintext.decode("utf-8")
