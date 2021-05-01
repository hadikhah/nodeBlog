const Schema = {
    // $$async: true,
    name: {
        type: "string", empty: "false", min: 3, max: 200,
        messages: {
            stringMin: 'نام و نام خانوادگی نباید کمتر از سه کاراکتر باشد.',
            stringEmpty: "نام و نام خانوادگی الزامی می باشد."
        }

    },
    email: {
        type: "email",
        messages: {
            email: "ایمیل وارد شده نامعتبر می باشد.",
            emailEmpty: "وارد کردن ایمیل الزامی می باشد.",
            normalize: true
        }
        // custom: async (v, errors) => {
        //     // E.g. checking in the DB that the value is unique.
        //     const res = await DB.checkUsername(v);
        //     if (!res)
        //         errors.push({ type: "unique", actual: value });

        //     return v;
        // }
    },
    mobile: {
        type: "string", pattern: /^09[0-9]{9}$/, nullable: true, empty: "true",
        messages: {
            stringPattern: "شماره موبایل وارد شده نامعتبر است.موبایل خود را با فرمت 09 وارد نمایید!"
        }
    },
    password: {
        type: "string", empty: "false",
        pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/, confirmed: true,
        messages: {
            stringEmpty: "گذرواژه الزامی می باشد.",
            stringPattern: "گذرواژه باید داریرمز عبور باید حداقل ۶ کاراکتر و ترکیبی از حروف بزرگ، حروف کوچک، اعداد و کاراکترهای غیر الفبا مانند !@#$%^&*() باشد.",
        }
    },
    confirm_password: {
        type: "equal", empty: "false", field: 'password', strict: true,
        messages: {
            emptyString: "گذرواژه را تایید نکردید.",
            equalField: "گذرواژه و تکرار آن باهم تطابق ندارند!"
        }
    }

}
module.exports = Schema