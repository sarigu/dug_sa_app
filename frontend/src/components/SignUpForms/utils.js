export const validateEmail = (email) => {
    console.log("VALIDAROR", email);
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const validatePassword = (password) => {
    console.log("VALIDAROR PAss", password);
    if (password.length > 7) {
        return true;
    } else {
        return false;
    }
}


export const validateYear = (year) => {

    var text = /^[0-9]+$/;

    if (!text.test(year)) {
        return false;
    }

    if (year.length == 4) {
        return true;
    } else {
        return false;
    }



}

export const validateExperince = (year) => {
    console.log("VALIDAROR experience", year);
    var text = /^[0-9]+$/;

    if (!text.test(year)) {
        return false;
    }

    if (year.length > 2) {
        return false;
    }
    return true;

}


export const validatePhone = (phone) => {
    console.log("VALIDAROR", phone);
    const re = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
    return re.test(phone);
}


