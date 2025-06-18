import React from "react"
import { Button } from "../ui/button"
import { Link } from "react-router-dom"

function Hero() {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h1 className="font-extrabold text-[50px] text-center mt-10">
        <span className="text-[#1e293b]">Unlock Your Dream Trip with AI: </span>{" "}
        <p className="text-[#ea580c]">
          Seamless, Customized Itineraries Just for You
        </p>
      </h1>

      <p className="text-xl text-[#4A4A4A] text-center">
        Your AI Travel Companion — Crafting Itineraries Around Your Interests
        and Budget.
      </p>

      <Link to={"/create-trip"}>
        <Button>Get Started</Button>
      </Link>
    </div>
  )
}

export default Hero
