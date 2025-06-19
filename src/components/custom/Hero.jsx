import React from "react"
import { Button } from "../ui/button"
import { Link } from "react-router-dom"
import {
  FaMapMarkedAlt,
  FaRobot,
  FaWallet,
  FaGlobeAmericas,
  FaRegCheckCircle,
} from "react-icons/fa"

function LandingPage() {
  return (
    <div className="bg-white dark:bg-[#0f172a] text-gray-800 dark:text-gray-100">
      {/* HERO SECTION */}
      <section className="flex flex-col items-center px-4 md:px-20 lg:px-56 gap-12 py-20 text-center">
        <div>
          <h1 className="font-extrabold text-4xl md:text-5xl">
            <span className="text-[#1e293b] dark:text-[#e2e8f0]">
              Unlock Your Dream Trip with AI
            </span>
          </h1>
          <p className="text-[#ea580c] text-2xl mt-2 font-semibold">
            Seamless, Customized Itineraries Just for You
          </p>
        </div>

        <p className="text-lg md:text-xl text-[#4A4A4A] dark:text-[#A0A0A0] max-w-2xl">
          Your AI Travel Companion — crafting intelligent itineraries tailored
          to your interests, preferences, and budget in seconds.
        </p>

        <Link to="/create-trip">
          <Button className="text-lg px-6 py-3">Get Started</Button>
        </Link>
      </section>

      {/* FEATURES SECTION */}
      <section className="bg-gray-100 dark:bg-[#1e293b] py-20 px-4 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Features You’ll Love
        </h2>
        <div className="grid gap-10 grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto">
          {[
            {
              icon: <FaRobot />,
              title: "AI-Powered Planning",
              desc: "Smart itineraries tailored to your preferences.",
            },
            {
              icon: <FaWallet />,
              title: "Budget Optimized",
              desc: "Stays, food, and experiences based on your budget.",
            },
            {
              icon: <FaMapMarkedAlt />,
              title: "Interactive Maps",
              desc: "Visually explore your travel route.",
            },
            {
              icon: <FaGlobeAmericas />,
              title: "Worldwide Coverage",
              desc: "Plan trips across hundreds of global cities.",
            },
          ].map((feature, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="text-[#ea580c] text-3xl mt-1">{feature.icon}</div>
              <div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-[#4A4A4A] dark:text-[#A0A0A0]">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 px-4 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          {[
            "Enter your destination, preferences & budget",
            "Let AI generate your itinerary in seconds",
            "Review, edit & start your journey",
          ].map((step, idx) => (
            <div key={idx} className="flex flex-col items-center gap-3">
              <FaRegCheckCircle className="text-[#ea580c] text-4xl" />
              <p className="text-lg">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-[#ea580c] text-white py-16 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Plan Your Perfect Trip?
        </h2>
        <p className="text-lg mb-6">
          Start creating your personalized itinerary now!
        </p>
        <Link to="/create-trip">
          <Button className="bg-white text-[#ea580c] font-bold text-lg px-6 py-3 hover:bg-gray-100">
            Start Planning
          </Button>
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1e293b] text-gray-300 text-sm text-center py-6">
        © {new Date().getFullYear()} Built with 💡 & 🧠 by EverSols.
      </footer>
    </div>
  )
}

export default LandingPage
