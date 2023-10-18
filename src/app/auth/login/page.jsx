"use client";
import firebase_app from "@/firebase/config";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import Image from "next/image";
import { useRouter } from "next/navigation";
import GoogleButton from "react-google-button";

const { Button } = require("flowbite-react");

const auth = getAuth(firebase_app);
const provider = new GoogleAuthProvider();

const LoginPage = () => {
  const router = useRouter();
  const handleLogin = async () => {
    signInWithPopup(auth, provider).then((result) => {
      var credential = GoogleAuthProvider.credentialFromResult(result);


      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.idToken;
      console.log(token);

      router.push('/')
    });
  };

  return (
    <div className="h-[100vh] px-[1rem] md:px-[2rem] lg:px-[3rem] xl:px-[10rem]">
      <div className="flex w-full gap-4 justify-center items-center mx-auto h-[100vh]">
        <div className="w-6/12 justify-center items-center flex flex-col gap-2">
          <GoogleButton onClick={handleLogin} />
        </div>
        <div className="w-6/12 relative">
          <Image
            src="https://thuthuatnhanh.com/wp-content/uploads/2021/11/Hinh-anh-chim-chao-mao-sac-net-va-dep-nhat.jpg?fbclid=IwAR3W60eSDugGeS5fBfTpfHfX79KkZBLaP-rdic2sUHk8Vu2C6REkxDabOMU"
            sizes="100vh"
            fill
            style={{
              objectFit: "contain",
            }}
            alt="Login background"
            className="!static object-fill"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
