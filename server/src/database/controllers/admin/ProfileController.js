const Profile = require('../../migrations/Profile')

/*========== (GET) show profile  ==========*/
const index = async (req, res) => {
    await Profile.findAll()
    .then(profile => res.json(profile).sendStatus(200)).catch(err => res.json(err).sendStatus(404))
}
/*========== (POST) Create profile  ==========*/
const INSERT = async (req, res) => {
    const { name, about_me, email, github, youtube,
        linkedin, instagram, facebook, twitter, twitch } = req.body

    await Profile.create({ name, about_me, email, github, youtube, linkedin, instagram, facebook, twitter, twitch })
        .then(profile => res.json(profile).sendStatus(200)).catch(err => res.json(err).sendStatus(404))
}
/*========== (POST) Update profile  ==========*/
const UPDATE = async (req, res) => {
    const { name, about_me, email, github, youtube,
        linkedin, instagram, facebook, twitter, twitch } = req.body

    await Profile.update({ name, about_me, email, github, youtube, linkedin, instagram, facebook, twitter, twitch },
        { where: { id: 1 } })
        .then(res.sendStatus(200)).catch(err => res.json(err).sendStatus(404))
}

module.exports = {
    index,
    INSERT,
    UPDATE
}