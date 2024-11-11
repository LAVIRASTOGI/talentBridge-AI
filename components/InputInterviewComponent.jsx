"use client";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { mockInterviewGenerate } from "@/lib/action";
import { useUser } from "@clerk/nextjs";
import { SkillsAutocomplete } from "./SkillsAutocomplete";

function InputInterviewComponent({ category }) {
  const [isPending, setIsPending] = useState(false);
  const { user } = useUser();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      role: "",
      description: "",
      experience: "",
      skillLevel: "beginner",
      questionFormat: "conceptual",
      skills: [],
    },
  });

  const resetForm = () => {
    reset();
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      resetForm();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data) => {
    setIsPending(true);
    try {
      await mockInterviewGenerate(null, data, {
        id: user?.id,
      });
      // Show success toast
      showToast("success", "Interview data submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      showToast("error", "An error occurred while submitting the form.");
    } finally {
      setIsPending(false);
    }
  };

  const showToast = (type, message) => {
    const toast = document.getElementById("toast");
    if (toast) {
      toast.className = `alert alert-${type}`;
      toast.textContent = message;
      toast.style.display = "flex";
      setTimeout(() => {
        toast.style.display = "none";
      }, 3000);
    }
  };

  const renderFormField = (name, label, options) => (
    <div className="form-control w-full">
      <label className="label font-bold">
        <span className="label-text">{label}</span>
      </label>
      {options.inputType === "textarea" ? (
        <textarea
          className="textarea textarea-bordered h-24"
          placeholder={options.placeholder}
          {...register(name, options.validation)}
        />
      ) : (
        <input
          type={options.inputType || "text"}
          placeholder={options.placeholder}
          className="input input-bordered w-full"
          {...register(name, options.validation)}
        />
      )}
      {errors[name] && (
        <label className="label">
          <span className="label-text-alt text-error">
            {errors[name].message}
          </span>
        </label>
      )}
    </div>
  );

  const renderRadioGroup = (name, label, options) => (
    <div className="form-control">
      <label className="label font-bold">
        <span className="label-text">{label}</span>
      </label>
      <Controller
        name={name}
        control={control}
        rules={options.validation}
        render={({ field }) => (
          <div className="flex flex-wrap">
            {options.items.map((item) => (
              <label key={item.value} className="label cursor-pointer gap-2 ">
                <input
                  type="radio"
                  name={name}
                  className="radio radio-primary"
                  value={item.value}
                  checked={field.value === item.value}
                  onChange={() => field.onChange(item.value)}
                />
                <span className="label-text">{item.label}</span>
              </label>
            ))}
          </div>
        )}
      />
      {errors[name] && (
        <label className="label">
          <span className="label-text-alt text-error">
            {errors[name].message}
          </span>
        </label>
      )}
    </div>
  );

  return (
    <div className="p-4">
      {/* Toast */}
      <div id="toast" className="alert hidden fixed top-4 right-4 z-50"></div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        {renderFormField("role", "Job Role/Job Position", {
          placeholder: "Enter Job Role",
          validation: { required: "Job role is required" },
        })}

        {renderRadioGroup("skillLevel", "Skill Level", {
          items: [
            { value: "beginner", label: "Beginner" },
            { value: "intermediate", label: "Intermediate" },
            { value: "advanced", label: "Advanced" },
          ],
          validation: { required: "Skill level is required" },
        })}
        <SkillsAutocomplete control={control} name="skills" />
        {renderRadioGroup("questionFormat", "Interview Question Format", {
          items: [
            {
              value: "conceptual",
              label: "Technical Concepts & Problem Solving",
            },
            {
              value: "multipleChoice",
              label: "Multiple Choice Questions (MCQs)",
            },
          ],
          validation: { required: "Please select a question format" },
        })}

        {renderFormField(
          "description",
          "Job Description/Tech Stack (In Short)",
          {
            inputType: "textarea",
            placeholder: "Enter Job Description",
            validation: {
              required: "Job description is required",
              minLength: {
                value: 50,
                message: "Description must be at least 50 characters long",
              },
            },
          }
        )}

        {renderFormField("experience", "Years of experience", {
          inputType: "number",
          placeholder: "Enter Year of Experience",
          validation: {
            required: "Years of experience is required",
            min: {
              value: 0,
              message: "Experience cannot be negative",
            },
            max: {
              value: 50,
              message: "Experience cannot exceed 50 years",
            },
          },
        })}

        <div className="py-4 flex gap-4 justify-end">
          <button
            type="submit"
            className={`btn btn-primary text-white ${
              isPending ? "loading" : ""
            }`}
            disabled={isPending}
          >
            {isPending ? "Getting Data from AI..." : "Start Interview"}
          </button>
          <button
            type="button"
            className="btn btn-outline border-primary text-primary hover:text-white hover:bg-primary"
            onClick={resetForm}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default InputInterviewComponent;
