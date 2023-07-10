import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { fetchApplicant } from '../features/applicantSlice'
import pic4 from '../assets/pic4.png'
import classes from './Image.module.css'
import {
  updateFirstName,
  updateLastName,
  updateEmail,
  updateSkills,
  updateHobbies,
} from '../features/applicantSlice'
import axios from '../axiosConfig'

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

  //   const handleDelete = () => {
  //     // Dispatch an action to delete the data in the backend
  //     axios
  //       .delete('/awesome/applicant/1')
  //       .then((response) => {
  //         console.log(response.data) // Log the deleted data
  //       })
  //       .catch((error) => {
  //         console.log(error) // Handle the error
  //       })
  //   }

  return (
    <div className={classes.container}>
      <img
        className={classes.pic}
        src={pic4}
        alt='Profile Picture'
        onClick={handleClick}
      />
      {status === 'succeeded' && isTextVisible && (
        <div
          className={`${classes.text} ${
            isTextDisappearing ? classes.disappear : classes.visible
          }`}
        >
          {isEditMode ? (
            <>
              <input
                type='text'
                className={classes.inputs}
                value={applicant.first_name}
                onChange={(e) => dispatch(updateFirstName(e.target.value))}
              />
              <input
                type='text'
                className={classes.inputs}
                value={applicant.last_name}
                onChange={(e) => dispatch(updateLastName(e.target.value))}
              />
              <input
                type='text'
                className={classes.inputs}
                value={applicant.email}
                onChange={(e) => dispatch(updateEmail(e.target.value))}
              />
              <input
                type='text'
                className={classes.inputs}
                value={applicant.skills.join(',')}
                onChange={(e) => {
                  const skills = e.target.value.split(',')
                  dispatch(updateSkills(skills))
                }}
              />
              <input
                type='text'
                className={classes.inputs}
                value={applicant.hobbies.join(',')}
                onChange={(e) => {
                  const hobbies = e.target.value.split(',')
                  dispatch(updateHobbies(hobbies))
                }}
              />
            </>
          ) : (
            <>
              <h2>
                {applicant.first_name} {applicant.last_name}
              </h2>
              <p>{applicant.email}</p>
              <p>{applicant.skills.join(', ')}</p>
              <p>{applicant.hobbies.join(', ')}</p>
              {/* Add more non-editable fields */}
            </>
          )}
          <div>
            {!isEditMode && (
              <button onClick={() => setIsEditMode(true)}>Edit</button>
            )}
            {isEditMode && (
              <>
                <button onClick={handleUpdate}>Update</button>
                {/* <button onClick={handleDelete}>Delete</button> */}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Image
