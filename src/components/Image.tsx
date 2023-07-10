import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { fetchApplicant } from '../features/applicantSlice'
import pic4 from '../assets/pic4.png'
import classes from './Image.module.css'

function Image() {
  const dispatch = useAppDispatch()
  const applicant = useAppSelector((state) => state.applicant.data)
  const status = useAppSelector((state) => state.applicant.status)
  const [isTextVisible, setIsTextVisible] = useState(false)
  const [isTextDisappearing, setIsTextDisappearing] = useState(false)

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
          <h2>
            {applicant.first_name} {applicant.last_name}
          </h2>
          <p>{applicant.email}</p>
          <p>{applicant.skills.join(', ')}</p>
          <p>{applicant.hobbies.join(', ')}</p>
          {/* Add more fields as necessary */}
        </div>
      )}
    </div>
  )
}

export default Image
