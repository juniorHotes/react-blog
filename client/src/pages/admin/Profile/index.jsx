import React, { useEffect, useState } from 'react'
import api from '../../../services/api'
import HorizontalHeader from '../../../components/HorizontalHeader'
import AdminOptions from '../../../components/AdminOptions'

import { ProfileContainer, ImgContainer, Img, Email, Textarea} from './styles'

import Button from '../../../components/Button'
import Input from '../../../components/Input'
import DefaulUserPofile from '../../../assets/icons/default_user.svg'

export default function Profile() {
    const [profile, setProfile] = useState([])

    useEffect(async () => {
        const { data } = await api.get('/admin/profile')
        setProfile(...data)
        console.log(data)
    }, [])

    return (
        <>
            <HorizontalHeader listOptions={
                <AdminOptions />
            } />
            <div className='container'>

                <ProfileContainer>
                    <ImgContainer>
                        <Img src={DefaulUserPofile} alt="" />
                    </ImgContainer>

                    <h1>{profile.name}</h1>
                    <Email>{profile.email}</Email>
                    <Textarea name="about" id="about">{profile.about_me}</Textarea>
                </ProfileContainer>

                <div>
                    <Input label="Linkedin" type="url" name="linkedin" placeholder='URL' size='50%' />
                    <Input label="Youtube" type="url" name="youtube" placeholder='URL' size='50%' />
                    <Input label="Github" type="url" name="github" placeholder='URL' size='50%' />
                    <Input label="Twitch" type="url" name="twitch" placeholder='URL' size='50%' />
                    <Input label="Instagram" type="url" name="instagram" placeholder='URL' size='50%' />
                    <Input label="Facebook" type="url" name="facebook" placeholder='URL' size='50%' />
                    <Input label="Twitter" type="url" name="twitter" placeholder='URL' size='50%' />
                </div>

            </div>
        </>
    )
}