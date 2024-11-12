"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { mockInterviewGenerate } from "@/lib/action";
import { useUser } from "@clerk/nextjs";

import {
  DEFAULT_FORM_VALUES,
  QUESTION_FORMATS,
  SKILL_LEVELS,
} from "@/constant";
import toast from "react-hot-toast";

// Constants

function InputInterviewComponent({ category, closeModal }) {
  const [isPending, setIsPending] = useState(false);
  const { user } = useUser();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const resetForm = useCallback(() => {
    reset();
    closeModal();
  }, [reset]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      resetForm();
    }
  }, [isSubmitSuccessful, resetForm]);

  const onSubmit = useCallback(
    async (data) => {
      setIsPending(true);
      try {
        await mockInterviewGenerate(null, data, {
          id: user?.id,
        });
        toast.success("Form submitted successfully. Test is about to begin");
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error(
          error.message ||
            "Error occured While Starting Test. Please Try After Sometime"
        );
      } finally {
        setIsPending(false);
      }
    },
    [user?.id]
  );

  const renderFormField = useMemo(
    () => (name, label, options) =>
      (
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
      ),
    [errors, register]
  );

  const renderRadioGroup = useMemo(
    () => (name, label, options) =>
      (
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
                  <label
                    key={item.value}
                    className="label cursor-pointer gap-2"
                  >
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
      ),
    [control, errors]
  );

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        {renderFormField("role", "Job Role/Job Position", {
          placeholder: "Enter Job Role",
          validation: { required: "Job role is required" },
        })}

        {renderRadioGroup("skillLevel", "Skill Level", {
          items: SKILL_LEVELS,
          validation: { required: "Skill level is required" },
        })}

        <SkillsAutocomplete control={control} name="skills" />

        {renderRadioGroup("questionFormat", "Interview Question Format", {
          items: QUESTION_FORMATS,
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
                value: 20,
                message: "Description must be at least 20 characters long",
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
            className={`btn bg-primary rounded-xl text-white  hover:text-white hover:bg-primary  hover:border-white
               disabled:opacity-75 disabled:cursor-not-allowed disabled:bg-primary disabled:text-white }`}
            disabled={isPending}
          >
            {isPending ? "Getting Data from AI..." : "Start Interview"}
          </button>
          <button
            type="button"
            className="btn btn-outline border-primary text-primary hover:text-white hover:bg-primary rounded-xl"
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
