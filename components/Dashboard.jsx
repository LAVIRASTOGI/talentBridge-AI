import { FaPlus } from "react-icons/fa6";
import CustomDialogue from "./CustomDialogue";
import InputInterviewComponent from "./InputInterviewComponent";

const TiggerSection = () => (
  <label
    htmlFor="mockInterviewAI"
    className="flex gap-2 items-center cursor-pointer"
  >
    <FaPlus /> Add New
  </label>
);

function Dashboard({ title }) {
  return (
    <div className="h-[60vh]">
      <div className="flex flex-col gap-4 items-center ">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <h2>Create and start Your {title}</h2>
        <div className="flex justify-center items-center  w-[200px] md:w-[300px] h-[200px] bg-gray-400">
          <CustomDialogue
            TiggerSection={<TiggerSection />}
            idName="mockInterviewAI"
            title="Interview Details"
            description="Enter the details for the Interview"
          >
            <InputInterviewComponent catergory="AIMockIntereview" />
          </CustomDialogue>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
