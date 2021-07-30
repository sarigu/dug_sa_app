export const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const validatePassword = (password) => {
    if (password.length > 7) {
        return true;
    } else {
        return false;
    }
}

export const validateYear = (date) => {
    let [day, month, year] = date.split('.');
    console.log("val", day, month, year)
    if (day && month && year) {
        if (day.length !== 2 || month.length !== 2 || year.length !== 4) {
            return false;
        } else if (day < 0 || day > 31 || month < 1 || month > 12 || year < 1900) {
            return false;
        }
        return true;
    } else {
        return false;
    }
}

export const validateTime = (time) => {
    let [hour, minute, seconds] = time.split(':');
    console.log("val", hour, minute, seconds)
    if (hour && minute && seconds) {
        if (hour.length !== 2 || minute.length !== 2 || seconds.length !== 2) {
            return false;
        }
        return true;
    } else {
        return false;
    }
}

export const validateExperince = (year) => {
    console.log("VALIDAROR experience", year);
    var text = /^[0-9]+$/;

    if (!text.test(year)) {
        console.log("text false", text.test(year))
        return false;
    }

    if (year.length > 2) {
        console.log("longer than 2")
        return false;
    }

    if (year < 0) {
        console.log("minus years")
        return false;
    }
    return true;

}


export const validatePhone = (phone) => {
    console.log("VALIDAROR", phone);
    const re = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
    return re.test(phone);
}


