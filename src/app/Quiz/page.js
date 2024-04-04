import React from 'react'
import Quiz from '../Components/Quiz1'
import { module1Quiz } from '../utils/Question'

const page = () => {
  return (
    <div><Quiz quizData={module1Quiz}/></div>
  )
}

export default page