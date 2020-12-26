const express = require('express')
const User = require('../models/user')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const verifyNewPasswords = (body)=> {
   
    // regarder qu'il y'a bien new_password & new_passord_confirmation
    // regarder que new password match avec new_password_confirmation
    try {
        if(body.new_password == body.new_password_confirm) {
            return true;
        }else {
            throw new Error('error new_password and new_password_confirm are not they same')
        }
    }catch(e) {
        throw new Error('error the request miss the new_password or new_password_confirm parameters')
    }
}

module.exports = {
    verifyNewPasswords
}