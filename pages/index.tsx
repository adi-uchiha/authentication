import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import dbConnect from '../lib/dbConnect'
import user from '../models/User'

interface props{
  users: [{
    username: String,
    password: String,
    _id: String
  }]
}

const Index = ( {users}: props ) => {
  console.log(users[0]?._id)
  return (
    <div className="flex flex-row min-h-screen  items-center justify-center py-2">
      <Head>
        <title>Authentication</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='m-auto border-2 rounded-3xl p-12 bg-slate-200'>
        <div className='flex flex-col space-y-4 '>

          <label htmlFor="username">Username</label>
          <input type="text" placeholder='Enter username'
            className='p-1 rounded-lg' />


          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="" placeholder='Enter password'
            className='p-1 rounded-lg' />

          <button
            type="submit"
            className='bg-blue-300 hover:bg-blue-500 p-2 w-24 rounded-md '
          >Login</button>
        </div>
      </div>
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