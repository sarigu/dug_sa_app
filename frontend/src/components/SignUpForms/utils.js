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


export const validateYear = (date) => {
    console.log("VLAIDATOR date------", date);
    let [day, month, year] = date.split('/');
    console.log(day, month, year)
    if (day && month && year) {
        console.log(day.length, month.length, year.length)
        if (day.length !== 2 || month.length !== 2 || year.length !== 4) {
            console.log("TOO LONG")
            return false;
        } else if (day < 0 || day > 31 || month < 1 || month > 12 || year < 1900) {
            console.log("NOT IN REANGE", day < 0, day < 31, month < 1, month > 12, year < 1900)
            return false;
        }
        return true;
    } else {
        console.log("VAL EMPTY")
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


