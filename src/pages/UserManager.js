import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../components/UI/Header'

import backImg from '../assets/cruzar.svg'

const UserManager = () => {

    const name = useSelector(state => state.user.displayName);

  return (
    <Header
        type='manager'
        leftImg={null}
        titleText={name + "'s Manager"}
        rightImg={backImg}
    />
    )
}

export default UserManager