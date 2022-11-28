import React from 'react'
import { Link } from 'react-router-dom'

export default function Back() {
  return (
    <>
      <div className="loading-screen vh-100 bg-danger d-flex flex-column justify-content-center align-items-center text-center">
        <h1 className='text-white mb-4' > May be You are not available in this website</h1>
        <Link to="/login" className='btn btn-outline-info text-white' >click here to login </Link>
      </div>
    </>
  )
}
