import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import dbConnect from '../lib/dbConnect'
import user from '../models/User'


const Index = ( {users}) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')


  const [form, setForm] = useState({})

  const postData = async (form) => {
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      router.push('/')
    } catch (error) {
      console.log(error)
      setMessage('Failed to add pet')
    }
  }

  function handleChange(e){
    e.preventDefault()
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
    console.log(form)
  }

  function handleSubmit(e){
    e.preventDefault()
    postData(form)
  }

  
  return (
    <div className="flex flex-row min-h-screen  items-center justify-center py-2">
      <Head>
        <title>Authentication</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <form onSubmit={handleSubmit}>

      <div className='m-auto border-2 rounded-3xl p-12 bg-slate-200'>
        <div className='flex flex-col space-y-4 '>

          <label htmlFor="username">Username</label>
          <input
          onChange={handleChange} 
          type="text" 
          name="username"
          placeholder='Enter username'
          className='p-1 rounded-lg' />


          <label htmlFor="password">Password</label>
          <input
          onChange={handleChange} 
          type="password" 
          name="password" 
          id="" 
          placeholder='Enter password'
          className='p-1 rounded-lg' />

          <button
            type="submit"
            className='bg-blue-300 hover:bg-blue-500 p-2 w-24 rounded-md '
            >Login</button>
        </div>
      </div>
            </form>
    </div>  
  )
}

export default Index

export async function getServerSideProps(){
  await dbConnect();

  const result = await user.find({})

  const pets = result.map((doc) => {
    const pet = doc.toObject()
    // Because you can only return json data, we convert the pet._id to string
    pet._id = pet._id.toString() 
    return pet
  })

  return { props: { users: pets } }
}