const shopRepo = require("./shop.repo");
const axios = require('axios');
const constants = require('./constants');
module.exports = {

    async inviteUser(invitationData, shopId) {
        const headers = {
            "Content-Type":"application/json",
            "Accept":"*/*"
        }
        const invitationResponse = await axios({
            method: 'post',
            url: constants.API_URL,
            data: invitationData,
            headers: headers
        });

        switch (invitationResponse.status) {
            case 201:
                const response = await shopRepo.updateInvitation(invitationResponse.data.authId, shopId, invitationData.email);
                return response ? {data:invitationResponse.data} : {error: {status:500,message:'No shop found'}}
            case 200:
                return {error: {status:400,message:'User already invited to this shop'}}
            default:
                return {error: {status:500,message:'No shop found'}}       
        }
    }

}