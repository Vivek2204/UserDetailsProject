import React from 'react'
import Image from './ImageElement/Image'
import './UserDetails.css'

export default function UserDetails({ phoneIcon,imgSrc, data, altText }) {
    return (
        <div className='userdetails-div-image'>
            <Image cssClass={phoneIcon ? 'image-imgIcon image-imgIconRotate' : 'image-imgIcon'} imgSrc={imgSrc} altText={altText} />
            <span className='userdetails-details'>{data}</span>
        </div>
    )
}
