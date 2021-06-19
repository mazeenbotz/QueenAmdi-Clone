/*
# Copyright (C) 2020 MuhammedKpln.
# edited by Vai838

# WhatsAsena is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# WhatsAsena is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.
#

*/

const Asena = require('../events')
const { MessageType } = require('@adiwajshing/baileys')
const axios = require('axios')
const cn = require('../config');

const Language = require('../language')
const { errorMessage, infoMessage } = require('../helpers')
const Lang = Language.getString('instagram')


if (cn.WORKTYPE == 'private') {

    Asena.addCommand({ pattern: 'readig ?(.*)', fromMe: true, usage: Lang.USAGE, desc: Lang.DESC }, async (message, match) => {

        const userName = match[1]

        if (userName === '') return await message.client.sendMessage(infoMessage(Lang.LOADING))

        await axios
          .get(`https://docs-jojo.herokuapp.com/api/stalk?username=${userName}`)
          .then(async (response) => {
            
            const {
              username,
              biography,
              external_url,
              followers,
              following,
              name,
              category_name,
              is_private,
              is_verified,
              profile_pic,
            } = response.data.result

            const profileBuffer = await axios.get(profile_pic, {
              responseType: 'arraybuffer',
            })

            const msg = (`*${Lang.NAME}*: ${name} \n*${Lang.USERNAME}*: ${username} \n*${Lang.BIO}*: ${biography} \n*${Lang.FOLLOWERS}*: ${followers} \n*${Lang.FOLLOWS}*: ${following} \n*${Lang.ACCOUNT}*: ${is_private ? Lang.HIDDEN : Lang.PUBLIC}`);
            
            await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, {
              caption: msg,
            })
          })
          .catch(
            async (err) => await message.sendMessage(errorMessage(Lang.NOT_FOUND + userName)),
          )
      },
    )
}
else if (cn.WORKTYPE == 'public') {

    Asena.addCommand({ pattern: 'readig ?(.*)', fromMe: false, usage: Lang.USAGE, desc: Lang.DESC }, async (message, match) => {

        const userName = match[1]

        if (userName === '') return await message.client.sendMessage(infoMessage(Lang.LOADING))

        await axios
          .get(`https://docs-jojo.herokuapp.com/api/stalk?username=${userName}`)
          .then(async (response) => {
            const {
              username,
              biography,
              external_url,
              followers,
              following,
              name,
              category_name,
              is_private,
              is_verified,
              profile_pic,
            } = response.data.result

            const profileBuffer = await axios.get(profile_pic, {
              responseType: 'arraybuffer',
            })

            const msg = (`*${Lang.NAME}*: ${name} \n*${Lang.USERNAME}*: ${username} \n*${Lang.BIO}*: ${biography} \n*${Lang.FOLLOWERS}*: ${followers} \n*${Lang.FOLLOWS}*: ${following} \n*${Lang.ACCOUNT}*: ${is_private ? Lang.HIDDEN : Lang.PUBLIC}`);
                        
            await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, {
              caption: msg,
            })
          })
          .catch(
            async (err) => await message.sendMessage(errorMessage(Lang.NOT_FOUND + userName)),
          )
      },
    )
}
