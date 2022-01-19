module.exports = {

    updateInvitation(authId, shopId, email) {
        return new Promise((resolve, reject) => {
            User.findOneAndUpdate({
                authId: authId
            }, {
                authId: authId,
                email: email
            }, {
                upsert: true,
                new: true
            }, (err, createdUser) => {
                Shop.findById(shopId).exec((err, shop) =>{
                    if (err || !shop) {
                        resolve(null);
                    }
                    if (shop.invitations.includes(invitationResponse.body.invitationId)) {
                        shop.invitations.push(invitationResponse.body.invitationId);
                    }
                    if (shop.users.includes(createdUser._id)) {
                        shop.users.push(createdUser);
                    }
                    shop.save();
                    resolve(true)
                });
            });
        });
    }

}