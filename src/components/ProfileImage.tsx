import React from 'react'
import pic4 from '../assets/pic4.png'
import classes from './Image.module.css'

// Define the props for the ProfileImage component
interface ProfileImageProps {
  handleClick: () => void
}

// Define the ProfileImage component
const ProfileImage: React.FC<ProfileImageProps> = ({ handleClick }) => {
  // Render the ProfileImage component
  return (
    <img
      className={classes.pic}
      src={pic4}
      alt='Profile Picture'
      onClick={handleClick}
    />
  )
}

export default ProfileImage
