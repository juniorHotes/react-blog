import React, { useEffect, useState } from 'react'
import api from '../../../services/api'
import VerticalNav from '../../../components/VerticalNav'
import AdminOptions from '../../../components/AdminOptions'
import WrapperAside from '../../../components/WrapperAside'

import { ProfileContainer, ImgContainer, Img, Email} from './styles'

import Button from '../../../components/Button'
import Input from '../../../components/Input'
import TextArea from '../../../components/TextArea'
import DefaulUserPofile from '../../../assets/icons/default_user.svg'

export default function Profile() {
    const [profile, setProfile] = useState([])
    const [about, setAbout] = useState('')

    useEffect(async () => {
        const { data } = await api.get('/admin/profile')
        setProfile(...data)
        setAbout(data[0].about_me)
        console.log(data[0].about_me)
    }, [])

    return (
        <>
            <VerticalNav listOptions={
                <AdminOptions />
            } />
            <WrapperAside title='Perfil'>

                <ProfileContainer>
                    <ImgContainer>
                        <Img src={DefaulUserPofile} alt="" />
                    </ImgContainer>

                    <h1>{profile.name}</h1>
                    <Email>{profile.email}</Email>
                    <TextArea name="about" value={about} onChange={e => setAbout(e.target.value)}></TextArea>
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

            </WrapperAside>
        </>
    )
}