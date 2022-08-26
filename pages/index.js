import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import dbConnect from '../lib/dbConnect'
import User from '../models/User'


const Index = ( {users}) => {

  return (

    <div className='flex flex-row min-h-screen  items-center justify-center py-2'>

    <div className='flex m-auto flex-col items-center space-y-2'>
      <button
      className='bg-red-300 hover:bg-red-500 p-2 w-24 rounded-md '>
      <a href='/secret'>Secret</a>
      </button>
        
      <button
      className='bg-orange-300 hover:bg-orange-500 p-2 w-24 rounded-md '>
      <a href='/signup'>Sign up</a>
      </button>

      <button
      className='bg-blue-300 hover:bg-blue-500 p-2 w-24 rounded-md '>
      <a href='/login'>Login</a>
      </button>

        
    </div>
        </div>
  )
}
export default Index

export async function getServerSideProps(){
  await dbConnect();

  const result = await User.find({})

  const pets = result.map((doc) => {
    const pet = doc.toObject()
    // Because you can only return json data, we convert the pet._id to string
    pet._id = pet._id.toString() 
    return pet
  })

  return { props: { users: pets } }
}