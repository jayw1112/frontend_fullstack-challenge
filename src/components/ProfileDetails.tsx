// ProfileDetails.tsx
import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import classes from './Image.module.css'
import {
  updateFirstName,
  updateLastName,
  updateEmail,
  updateSkills,
  updateHobbies,
} from '../features/applicantSlice'

// Define the props for the ProfileDetails component
interface ProfileDetailsProps {
  isTextVisible: boolean
  isTextDisappearing: boolean
  isEditMode: boolean
  setIsEditMode: (isEditMode: boolean) => void
  handleUpdate: () => void
}

// Define the ProfileDetails component
const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  isTextVisible,
  isTextDisappearing,
  isEditMode,
  setIsEditMode,
  handleUpdate,
}) => {
  // Use the Redux hooks to dispatch actions and select data from the store
  const dispatch = useAppDispatch()
  const applicant = useAppSelector((state) => state.applicant.data)

  return (
    // Only render the component if isTextVisible is true
    isTextVisible && (
      <div
        className={`${classes.text} ${
          isTextDisappearing ? classes.disappear : classes.visible
        }`}
      >
        {/* Render edit form based on whether the component is in edit mode */}
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
          // If not in edit mode, render the applicant's details as text
          <>
            <h2>
              {applicant.first_name} {applicant.last_name}
            </h2>
            <p>{applicant.email}</p>
            <p>{applicant.skills.join(', ')}</p>
            <p>{applicant.hobbies.join(', ')}</p>
          </>
        )}
        <div>
          {/* Render different buttons based on whether the component is in edit mode */}
          {!isEditMode && (
            <button onClick={() => setIsEditMode(true)}>Edit</button>
          )}
          {isEditMode && <button onClick={handleUpdate}>Update</button>}
        </div>
      </div>
    )
  )
}

export default ProfileDetails
