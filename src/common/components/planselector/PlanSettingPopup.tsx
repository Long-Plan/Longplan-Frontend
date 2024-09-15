import { useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router

// mock data for branches as it's optional
const branches = ["-"];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function PlanSettingPopup({
  onClose,
  mode,
}: {
  onClose: () => void;
  mode: boolean;
}) {
  const [majors, setMajors] = useState<{ id: number; name_en: string }[]>([]);
  const [programs, setPrograms] = useState<string[]>([]);
  const [plans, setPlans] = useState<string[]>([]);

  const [selectedMajor, setSelectedMajor] = useState<{
    id: number;
    name_en: string;
  } | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<string>(""); // Define state for selectedProgram
  const [selectedBranch, setSelectedBranch] = useState(branches[0]);
  const [selectedPlan, setSelectedPlan] = useState("");

  const navigate = useNavigate(); // Get navigate function from useNavigate hook

  // Fetch majors and their IDs
  useEffect(() => {
    const fetchMajors = async () => {
      try {
        const response = await fetch("http://10.10.182.135:8000/api/v1/majors");
        const data = await response.json();
        if (data.success) {
          // Extract major names and IDs
          setMajors(
            data.result.map((major: any) => ({
              id: major.id,
              name_en: major.name_en,
            }))
          );
          setSelectedMajor(data.result[0]); // Set the default selection
        }
      } catch (error) {
        console.error("Error fetching majors:", error);
      }
    };

    fetchMajors();
  }, []);

  // Fetch curriculum based on selected major's ID
  useEffect(() => {
    if (selectedMajor) {
      const fetchCurriculum = async () => {
        try {
          const response = await fetch(
            `http://10.10.182.135:8000/api/v1/curricula/major/${selectedMajor.id}`
          );
          const data = await response.json();
          if (data.success) {
            const programName = data.result[0].name_th; // First program
            const planChoices =
              data.result[0].curriculum_questions[0].choices.map(
                (choice: any) => choice.name_en
              );
            setPrograms([programName]);
            setPlans(planChoices);
            setSelectedProgram(programName); // Update the selectedProgram state
            setSelectedPlan(planChoices[0]);
          }
        } catch (error) {
          console.error("Error fetching curriculum:", error);
          setPrograms([]);
          setPlans([]);
          setSelectedProgram("");
          setSelectedPlan("");
        }
      };

      fetchCurriculum();
    }
  }, [selectedMajor]);

  const handleSubmit = () => {
    const formData = {
      major: selectedMajor?.name_en,
      program: selectedProgram,
      branch: selectedBranch,
      plan: selectedPlan,
    };

    console.log("Form submitted with data:", formData);
    if (mode) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl shadow-lg relative">
        {/* Welcome SVG Image */}
        <div className="">
          <img
            src="/imgs/welcome.svg"
            alt="Welcome"
            className="w-full h-full"
          />
        </div>

        <p className="text-center text-md font-medium my-8">
          เลือกภาควิชาที่คุณกำลังศึกษา
        </p>

        <div className="space-y-4 px-12">
          {/* Major (Department) Dropdown */}
          <div>
            <label className="block text-sm font-medium">ภาควิชา</label>
            <Listbox value={selectedMajor} onChange={setSelectedMajor}>
              <div className="relative mt-1">
                <Listbox.Button className="bg-white relative w-full cursor-default rounded-[20px] border border-blue-shadeb5 py-2 pl-3 pr-10 text-left text-blue-shadeb5 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                  <span className="block truncate">
                    {selectedMajor ? selectedMajor.name_en : "Select a Major"}
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-blue-shadeb5"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-[20px] bg-white py-1 text-base shadow-lg ring-1 ring-blue-shadeb5 ring-opacity-5 focus:outline-none">
                    {majors.map((major) => (
                      <Listbox.Option
                        key={major.id}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "text-white bg-blue-shadeb5"
                              : "text-gray-900",
                            "relative cursor-default select-none py-2 pl-10 pr-4"
                          )
                        }
                        value={major}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={classNames(
                                selected ? "font-medium" : "font-normal",
                                "block truncate"
                              )}
                            >
                              {major.name_en}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <CheckIcon
                                  className="h-5 w-5 text-blue-shadeb5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>

          {/* Program Dropdown */}
          <div>
            <label className="block text-sm font-medium">หลักสูตร</label>
            <Listbox value={selectedProgram} onChange={setSelectedProgram}>
              <div className="relative mt-1">
                <Listbox.Button className="bg-white relative w-full cursor-default rounded-[20px] border border-blue-shadeb5 py-2 pl-3 pr-10 text-left text-blue-shadeb5 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                  <span className="block truncate">{selectedProgram}</span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-blue-shadeb5"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-[20px] bg-white py-1 text-base shadow-lg ring-1 ring-blue-shadeb5 ring-opacity-5 focus:outline-none">
                    {programs.map((program, idx) => (
                      <Listbox.Option
                        key={idx}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "text-white bg-blue-shadeb5"
                              : "text-gray-900",
                            "relative cursor-default select-none py-2 pl-10 pr-4"
                          )
                        }
                        value={program}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={classNames(
                                selected ? "font-medium" : "font-normal",
                                "block truncate"
                              )}
                            >
                              {program}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <CheckIcon
                                  className="h-5 w-5 text-blue-shadeb5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>

          {/* Branch Dropdown (Optional) */}
          <div>
            <label className="block text-sm font-medium">สาย</label>
            <Listbox value={selectedBranch} onChange={setSelectedBranch}>
              <div className="relative mt-1">
                <Listbox.Button className="bg-white relative w-full cursor-default rounded-[20px] border border-blue-shadeb5 py-2 pl-3 pr-10 text-left text-blue-shadeb5 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                  <span className="block truncate">{selectedBranch}</span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-blue-shadeb5"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-[20px] bg-white py-1 text-base shadow-lg ring-1 ring-blue-shadeb5 ring-opacity-5 focus:outline-none">
                    {branches.map((branch, idx) => (
                      <Listbox.Option
                        key={idx}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "text-white bg-blue-shadeb5"
                              : "text-gray-900",
                            "relative cursor-default select-none py-2 pl-10 pr-4"
                          )
                        }
                        value={branch}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={classNames(
                                selected ? "font-medium" : "font-normal",
                                "block truncate"
                              )}
                            >
                              {branch}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <CheckIcon
                                  className="h-5 w-5 text-blue-shadeb5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>

          {/* Plan Dropdown */}
          <div>
            <label className="block text-sm font-medium">แผน</label>
            <Listbox value={selectedPlan} onChange={setSelectedPlan}>
              <div className="relative mt-1">
                <Listbox.Button className="bg-white relative w-full cursor-default rounded-[20px] border border-blue-shadeb5 py-2 pl-3 pr-10 text-left text-blue-shadeb5 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                  <span className="block truncate">{selectedPlan}</span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-blue-shadeb5"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-[20px] bg-white py-1 text-base shadow-lg ring-1 ring-blue-shadeb5 ring-opacity-5 focus:outline-none">
                    {plans.map((plan, idx) => (
                      <Listbox.Option
                        key={idx}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "text-white bg-blue-shadeb5"
                              : "text-gray-900",
                            "relative cursor-default select-none py-2 pl-10 pr-4"
                          )
                        }
                        value={plan}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={classNames(
                                selected ? "font-medium" : "font-normal",
                                "block truncate"
                              )}
                            >
                              {plan}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <CheckIcon
                                  className="h-5 w-5 text-blue-shadeb5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </div>

        {/* Confirm Button */}
        <div className="my-6 text-center">
          <button
            className="bg-blue-shadeb5 hover:bg-blue-shadeb5 text-white py-2 px-6 rounded-lg text-lg"
            onClick={handleSubmit}
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  );
}
