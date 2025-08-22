"use client"
import Image from "next/image"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { createDocument } from "../lib/actions/room.actions"
// import { createDocument } from "@/lib/actions/room.actions"

const AddDocumentBtn = ({userId, email}: AddDocumentBtnProps) => {
  const router = useRouter(); 
  const addDocumentHandler=async()=>{
    try {
      const room = await createDocument({ userId, email});
      if(room) router.push(`/documents/${room.id}`);
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Button type="submit" onClick={addDocumentHandler} className=" bg-gradient-to-t from-blue-500 to-blue-400 flex gap-1 shadow-md">
      <Image src="/assets/icons/add.svg" alt="ADD" width={24} height={24} />
      <p className=" hidden sm:block">Start a blank document</p>
    </Button>
  )
}
export default AddDocumentBtn