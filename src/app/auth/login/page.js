"use client"
import Image from "next/image"
import GoogleButton from "react-google-button"


const { Button } = require("flowbite-react")

const LoginPage = () => {

  return (
    <div className="h-[100vh] px-[1rem] md:px-[2rem] lg:px-[3rem] xl:px-[10rem]">
      <div className="flex w-full gap-4 justify-center items-center mx-auto min-h-[100vh]">
        <div className='w-6/12 justify-center items-center flex flex-col gap-2'>
          <GoogleButton
            onClick={() => { console.log('Google button clicked') }}
          />
        </div>
        <div className='w-6/12 relative'>
          <Image
            src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e3b7cfa8-a906-41d6-8307-c875d772454f/dd5flx5-7b2806f1-66b9-434e-a397-988f6850b953.png/v1/fill/w_622,h_796,q_80,strp/astrograph_sorcerer_by_slackermagician_dd5flx5-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9Nzk2IiwicGF0aCI6IlwvZlwvZTNiN2NmYTgtYTkwNi00MWQ2LTgzMDctYzg3NWQ3NzI0NTRmXC9kZDVmbHg1LTdiMjgwNmYxLTY2YjktNDM0ZS1hMzk3LTk4OGY2ODUwYjk1My5wbmciLCJ3aWR0aCI6Ijw9NjIyIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.aeOmNHR_akeEGeXgvRjazWW1EvvmG1hA-QViWzMiCY4'
            fill
            style={{
              objectFit: 'contain',
            }}
            alt='Login background'
            className='!static'
          />
        </div>
      </div>
    </div>
  )
}

export default LoginPage