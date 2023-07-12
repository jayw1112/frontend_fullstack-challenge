// Image.tsx
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { fetchApplicant } from '../features/applicantSlice'
import classes from './Image.module.css'
import axios from '../axiosConfig'
import ProfileDetails from './ProfileDetails'
import ProfileImage from './ProfileImage'

function Image() {
  const dispatch = useAppDispatch()
  const applicant = useAppSelector((state) => state.applicant.data)
  const status = useAppSelector((state) => state.applicant.status)
  const [isTextVisible, setIsTextVisible] = useState(false)
  const [isTextDisappearing, setIsTextDisappearing] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

  const handleClick = () => {
    if (isTextVisible) {
      setIsTextDisappearing(true)
      setTimeout(() => {
        setIsTextVisible(false)
        setIsTextDisappearing(false)
      }, 600) // Delay for 1 second before changing the class
    } else {
      dispatch(fetchApplicant())
      setIsTextVisible(true)
    }
  }

  useEffect(() => {
    if (!isTextVisible) {
      setIsTextDisappearing(false)
    }
  }, [isTextVisible])

  const handleUpdate = () => {
    // Dispatch an action to update the data in the backend
    const updatedApplicant = {
      id: applicant.id, // Add the id property to the object
      first_name: applicant.first_name,
      last_name: applicant.last_name,
      email: applicant.email,
      skills: applicant.skills,
      hobbies: applicant.hobbies,
    }
    axios
      .put(`/awesome/applicant/${applicant.id}`, updatedApplicant) // Use dynamic id
      .then((response) => {
        console.log(response.data) // Log the updated data
        setIsEditMode(false) // Set isEditMode to false to exit edit mode
      })
      .catch((error) => {
        console.log(error) // Handle the error
      })
  }

  return (
    <div className={classes.container}>
      <ProfileImage handleClick={handleClick} />
      {status === 'succeeded' && (
        <ProfileDetails
          isTextVisible={isTextVisible}
          isTextDisappearing={isTextDisappearing}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  )
}

export default Image
