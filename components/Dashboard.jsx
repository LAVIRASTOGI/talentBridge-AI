"use client";
import { FaPlus } from "react-icons/fa6";
import CustomDialogue from "./CustomDialogue";
import InputInterviewComponent from "./InputInterviewComponent";
import { useEffect, useState } from "react";

function Dashboard({ title }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const TiggerSection = () => (
    <label
      className="flex gap-2 items-center cursor-pointer"
      onClick={openModal}
    >
      <FaPlus /> Add New
    </label>
  );

  return (
    <div className="mb-24">
      <div className="flex flex-col gap-4 items-center ">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <h2>Create and start Your {title}</h2>
        <div className="flex justify-center items-center  w-[200px] md:w-[300px] h-[200px] bg-gray-400">
          <CustomDialogue
            TiggerSection={<TiggerSection />}
            idName="mockInterviewAI"
            title="Interview Details"
            description="Enter the details for the Interview"
            isOpen={isOpen}
            closeModal={closeModal}
          >
            <InputInterviewComponent
              catergory="AIMockIntereview"
              closeModal={closeModal}
            />
          </CustomDialogue>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
