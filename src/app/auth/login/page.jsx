"use client";
import firebase_app from "@/firebase/config";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  linkWithRedirect,
} from "firebase/auth";

import Image from "next/image";
import { useRouter } from "next/navigation";
import GoogleButton from "react-google-button";

const { Button } = require("flowbite-react");

const auth = getAuth(firebase_app);
const googleProvider = new GoogleAuthProvider();

const LoginPage = () => {
  const router = useRouter();
  const handleLogin = async () => {
    signInWithPopup(auth, googleProvider).then((result) => {
      var credential = GoogleAuthProvider.credentialFromResult(result);

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.idToken;
      console.log(token);
      console.log(auth);

      //router.push("/");
    });
  };

  const handleCreateAccount = async () => {
    createUserWithEmailAndPassword(
      auth,
      "datlt.mdc@gmail.com",
      "somenewPassword"
    )
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        console.log(auth);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(error);
      });
  };

  const handleLoginPassword = async () => {
    signInWithEmailAndPassword(auth, "datlt.mdc@gmail.com", "somenewPassword")
      .then( async (userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        console.log(auth);

        const currentUser = auth.currentUser
        //const credential = await linkWithRedirect(currentUser, googleProvider);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(error);
      });
  };

  const handleLogout = async () => {
    signOut(auth)
    console.log(auth);
  }

  return (
    <div className="h-[100vh] px-[1rem] md:px-[2rem] lg:px-[3rem] xl:px-[10rem]">
      <div className="flex w-full gap-4 justify-center items-center mx-auto h-[100vh]">
        <Button onClick={handleCreateAccount} >Signup with email password</Button>
        <Button onClick={handleLoginPassword} >Login with email password</Button>
        <div className="w-6/12 justify-center items-center flex flex-col gap-2">
          <GoogleButton onClick={handleLogin} />
        </div>
        <Button onClick={handleLogout} >Logout</Button>
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
