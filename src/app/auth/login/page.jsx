"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import GoogleButton from "react-google-button"


const { Button } = require("flowbite-react")

const LoginPage = () => {
  const router = useRouter()

  return (
    <div className="h-[100vh] px-[1rem] md:px-[2rem] lg:px-[3rem] xl:px-[10rem]">
      <div className="flex w-full gap-4 justify-center items-center mx-auto h-[100vh]">
        <div className='w-6/12 justify-center items-center flex flex-col gap-2'>
          <GoogleButton
            onClick={() => { console.log('Google button clicked'); router.push('/'); }}
          />
        </div>
        <div className='w-6/12 relative'>
          <Image
            src='https://thuthuatnhanh.com/wp-content/uploads/2021/11/Hinh-anh-chim-chao-mao-sac-net-va-dep-nhat.jpg?fbclid=IwAR3W60eSDugGeS5fBfTpfHfX79KkZBLaP-rdic2sUHk8Vu2C6REkxDabOMU'
            sizes="100vh"
            fill
            style={{
              objectFit: 'contain',
            }}
            alt='Login background'
            className='!static object-fill'
          />
        </div>
      </div>
    </div>
  )
}

export default LoginPage