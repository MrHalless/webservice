const User = require('../models/user');
const AccessControl = require('../models/accesscontrol');
const Binding = require('../models/binding');

module.exports = {
    checkAccess: async function (req) {
        console.log(req.session.typeUser);
        if (req.session.typeUser === 'Локальная') {
            const templateName = await User.findOne({ login: req.session.user }).lean();
            const template = templateName.templateName;
            const findFlag = await AccessControl.findOne({ name: template }).lean();
            return findFlag;
        } else {
            try {
                const groupDomain = req.session.groupDomain;
                const templateName = await Binding.findOne({ groupDomain }).lean();
                const template = templateName.template;
                const findFlag = await AccessControl.findOne({ name: template }).lean();
                return findFlag;
            } catch (error) {
                return false;
            }
        }

    }
};
