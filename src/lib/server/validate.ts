const emailRegex = /^([\w%+-]+\.)*[\w%+-]+@([A-Z0-9-]+\.)+[A-Z0-9-]{2,}$/i;
const passwordLength = 8;
const nameLength = 50;
const usernameLength = 50;

export function validateEmail(email: FormDataEntryValue) {
    if (emailRegex.test(email?.toString())) {
        return true;
    } else {
        throw new Error('Invalid email address');
    }
}

export function validatePassword(password: FormDataEntryValue) {
    if (password.toString().length >= passwordLength) {
        return true;
    } else {
        throw new Error(
            `Password must be at least ${passwordLength} characters long`,
        );
    }
}

export function validateName(name: FormDataEntryValue) {
    if (name.toString().length <= nameLength) {
        return true;
    } else {
        throw new Error(`Name is too long`);
    }
}

export function validateUsername(username: FormDataEntryValue) {
    if (username.toString().length <= usernameLength) {
        return true;
    } else {
        throw new Error(`Username is too long`);
    }
}
