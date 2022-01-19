const invitationService = require("./invitation.service");

module.exports = {

    async inviteUser(req,res) {
        const invitationData = req.body;
        const shopId = req.params.shopId;
        const result = await invitationService.inviteUser(invitationData,shopId);
        if (result.data) {
            return res.status(200).send(result.data);
        } else {
            return res.status(result.error.status).send(result.error.message);
        }
    }

}