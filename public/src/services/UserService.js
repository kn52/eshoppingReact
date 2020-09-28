import {get, post, update} from "./HttpService";

export default class AdminService {

    registerUser(formData) {
        return (post(formData, 'user/register'))
    }

    loginUser = (formData) => {
        return (post(formData, 'user/login'))
    }

    getUserDetails() {
        return (get('user/details'))
    }

    sendEmailWithTokenLink(email) {
        return (post(email, `user/resend/email/${email}`))
    }

    verifyEmail(token) {
        return (update(`user/verify/email/${token}`))
    }

    setNewPassword(password, token) {
        return (post(password,`user/reset/password/${token}`))
    }
}
