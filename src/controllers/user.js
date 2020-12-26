const verifyNewPasswords = (body)=> {
   
    // regarder qu'il y'a bien new_password & new_passord_confirmation
    // regarder que new password match avec new_password_confirmation
    if(typeof(body.new_password) != "string" || typeof(body.new_password_confirm) != "string" ) {
        throw new Error("Error the new_password and new_password are not defined or are not String")
    }
    if(body.new_password == body.new_password_confirm) {
        return true;
    }else {
        throw new Error('Error new_password and new_password_confirm are not they same')
    }
}

module.exports = {
    verifyNewPasswords
}