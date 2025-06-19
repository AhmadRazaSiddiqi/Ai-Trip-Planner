import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc"
import { useGoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { doc, setDoc } from "firebase/firestore"
import { app, db } from "@/service/firebaseConfig"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { chatSession } from "@/service/AIModel"
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelList,
} from "@/constants/options"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import GeoapifyAutocomplete from "@/view-trip/components/LocationIQAutocomplete .jsx"
import { motion } from "framer-motion"

function CreateTrip() {
  const [place, setPlace] = useState()
  const [formData, setFormData] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const calculateProgress = () => {
    let progress = 0
    if (formData.location) progress += 1
    if (formData.noOfDays) progress += 1
    if (formData.budget) progress += 1
    if (formData.traveler) progress += 1
    return (progress / 4) * 100
  }

  useEffect(() => {
    console.log(formData)
  }, [formData])

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user")
    if (!user) {
      setOpenDialog(true)
      return
    }

    if (
      (formData?.noOfDAys > 5 && !formData?.location) ||
      !formData?.budget ||
      !formData.traveler
    ) {
      toast("Please fill all the details")
      return
    }

    setLoading(true)

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays)

    const result = await chatSession.sendMessage(FINAL_PROMPT)
    console.log(result?.response?.text())
    setLoading(false)
    SaveAiTrip(result?.response?.text())
  }

  const SaveAiTrip = async (TripData) => {
    setLoading(true)
    const user = JSON.parse(localStorage.getItem("user"))
    const docId = Date.now().toString()
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    })
    setLoading(false)
    navigate("/view-trip/" + docId)
  }

  const login = useGoogleLogin({
    onSuccess: (res) => GetUserProfile(res),
    onError: (error) => console.log(error),
  })

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data))
        setOpenDialog(false)
        onGenerateTrip()
      })
      .catch((error) => {
        console.error("Error fetching user profile: ", error)
      })
  }

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 px-5 mt-10">
      {/* ✅ PROGRESS BAR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="mb-4">
          <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
            <div
              className="bg-black dark:bg-gray-500 h-full transition-all duration-500"
              style={{ width: `${calculateProgress()}%` }}
            />
          </div>
          <p className="text-sm text-right text-gray-600 mt-1 dark:text-white">
            {calculateProgress()}% completed
          </p>
        </div>
      </motion.div>

      {/* ✅ HEADER */}
      <motion.h2
        className="font-bold text-3xl"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Your Dream Trip Starts Here 🗺️✨
      </motion.h2>
      <motion.p
        className="mt-3 text-gray-500 text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Tell us what excites you most about travel, and we'll create a custom
        itinerary filled with experiences you'll love.
      </motion.p>

      {/* ✅ FORM SECTION */}
      <motion.div
        className="mt-20 flex flex-col gap-10"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
      >
        {/* Location */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <h2 className="text-xl my-3 font-medium">
            Pick your perfect destination 📍
          </h2>
          <GeoapifyAutocomplete
            apiKey={import.meta.env.VITE_Geoapify_API_KEY}
            selectProps={{
              value: place,
              onChange: (v) => {
                setPlace(v)
                handleInputChange("location", v)
              },
            }}
          />
        </motion.div>

        {/* Days */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <h2 className="text-xl my-3 font-medium">
            How long is your getaway? 📅
          </h2>
          <Input
            placeholder={"Ex.5"}
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </motion.div>

        {/* Budget */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <h2 className="text-xl my-3 font-medium">
            What's your travel budget? 💰
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                  formData?.budget == item.title &&
                  "shadow-lg border-black dark:border-white"
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Travelers */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <h2 className="text-xl my-3 font-medium">
            Who will you be exploring with? 🌟
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelList.map((item, index) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={index}
                onClick={() => handleInputChange("traveler", item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                  formData?.traveler == item.people &&
                  "shadow-lg border-black dark:border-white"
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ✅ Generate Trip Button */}
      <motion.div
        className="my-10 justify-end flex"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Button disabled={loading} onClick={onGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </motion.div>

      {/* ✅ Dialog for Google Login */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <img
                  src="/logo.png"
                  alt="logo"
                  width="100px"
                  className="mx-auto"
                />
                <h2 className="font-bold text-lg mt-4">
                  Sign In to check out your travel plan
                </h2>
                <p>Sign in to the App with Google authentication securely</p>
                <Button
                  onClick={login}
                  className="w-full mt-6 flex gap-4 items-center"
                >
                  <FcGoogle className="h-7 w-7" />
                  Sign in With Google
                </Button>
              </motion.div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateTrip
