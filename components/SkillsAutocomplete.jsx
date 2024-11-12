"use client";
import { skillsDatabase } from "@/constant/Skills";
import { useState } from "react";
import { Controller } from "react-hook-form";

export const SkillsAutocomplete = ({ control, name }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const skillsValue = skillsDatabase.map((ele) => ele.skill);

  const handleInputChange = (value) => {
    setInputValue(value);
    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    // Filter suggestions based on input
    const filtered = skillsValue.filter((skill) =>
      skill.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered);
  };

  const handleKeyDown = (e, onChange, currentValue) => {
    // Add custom skill when pressing Enter
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!currentValue.includes(inputValue.trim())) {
        onChange([...currentValue, inputValue.trim()]);
        setInputValue("");
        setSuggestions([]);
      }
    }
  };

  return (
    <div className="form-control w-full">
      <label className="label font-bold">
        <span className="label-text">Skills Specialization</span>
        <span className="label-text-alt text-gray-500">
          Press Enter to add custom skills
        </span>
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue={[]}
        rules={{ required: "Please select at least one skill" }}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <div className="relative">
            <div className="flex flex-wrap gap-2 p-1 border rounded-lg">
              {/* Selected Skills Tags */}
              {value.map((skill, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-1 px-2 py-1 rounded-full bg-primary/20`}
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(value.filter((_, i) => i !== index));
                    }}
                    className="text-sm hover:text-error"
                  >
                    ×
                  </button>
                </div>
              ))}

              {/* Input Field */}
              <input
                type="text"
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, onChange, value)}
                className="flex-1 outline-none min-w-[200px] p-2 "
                placeholder="Type to search or add custom skills..."
              />
            </div>

            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-gray-100 text-black border rounded-lg shadow-lg max-h-60 overflow-auto">
                {suggestions.map((skill, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-primary/10 cursor-pointer"
                    onClick={() => {
                      if (!value.includes(skill)) {
                        onChange([...value, skill]);
                      }
                      setInputValue("");
                      setSuggestions([]);
                    }}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            )}

            {/* Add Custom Skill Button */}
            {inputValue.trim() && !suggestions.length && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
                <button
                  type="button"
                  className="w-full px-4 py-2 text-left hover:bg-secondary/10"
                  onClick={() => {
                    if (!value.includes(inputValue.trim())) {
                      onChange([...value, inputValue.trim()]);
                      setInputValue("");
                    }
                  }}
                >
                  Add "{inputValue}" as a custom skill
                </button>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {error.message}
                </span>
              </label>
            )}
          </div>
        )}
      />
    </div>
  );
};
