import React from 'react'
import "tailwindcss/tailwind.css";

export default function Home() {
  return (
    <React.Fragment>
      <div className="container   flex justify-center flex-col  h-screen bg-blue-900">

        <div className="mx-auto  neumorphismSize-lg  h-96 w-96  rounded-full nm-concave-blue-900-xl ">
          <div className=" neumorphismSize-lg  h-96 w-96  rounded-full bg-gradient-to-r from-blue-900 to-blue-800 ">
          <div className="transform scale-90  h-96 w-96 rounded-full bg-blue-900 ">
            </div>

          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
