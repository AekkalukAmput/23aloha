exports.CODE_MESSAGE = {
    //success
    S01: "SUCCESS",
    //warning
    W01: "USER_NOT_FOUND",
    W02: "PASSWORD_NOT_MATCH",
    //error
    F01: "FAIL"
}
exports.message = (res) => {
    let message = {
        code: '',
        text: ''
    };
    switch (res) {
        case this.CODE_MESSAGE.S01:
            message.code = this.CODE_MESSAGE.S01;
            message.text = "Login Success";
            break;

        case this.CODE_MESSAGE.W01:
            message.code = this.CODE_MESSAGE.W01;
            message.text = "User not found!!!";
            break;

        case this.CODE_MESSAGE.W02:
            message.code = this.CODE_MESSAGE.W02;
            message.text = "Password not match!!!";
            break;

        case this.CODE_MESSAGE.F01:
            message.code = this.CODE_MESSAGE.F01;
            message.text = "Login fail";
            break;

        default:
            break;
    }
    return (
        message
    )
}