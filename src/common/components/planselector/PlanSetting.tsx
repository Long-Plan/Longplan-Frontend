import { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

// mock data
const departments = [
  "Computer Engineering (CPE)",
  "Electrical Engineering (EE)",
  "Mechanical Engineering (ME)",
];
const programs = [
  "Computer Engineering (CPE) - 2563",
  "Electrical Engineering (EE) - 2563",
];
const branches = ["-", "Software Engineering", "Hardware Engineering"];
const plans = ["Normal plan", "COOP plan"];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function PlanSettingPopup() {
  const [selectedDepartment, setSelectedDepartment] = useState(departments[0]);
  const [selectedProgram, setSelectedProgram] = useState(programs[0]);
  const [selectedBranch, setSelectedBranch] = useState(branches[0]);
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
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
          {/* Department Dropdown */}
          <div>
            <label className="block text-sm font-medium">ภาควิชา</label>
            <Listbox
              value={selectedDepartment}
              onChange={setSelectedDepartment}
            >
              <div className="relative mt-1">
                <Listbox.Button className="bg-white relative w-full cursor-default rounded-[20px] border border-blue-shadeb5 py-2 pl-3 pr-10 text-left text-blue-shadeb5 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                  <span className="block truncate">{selectedDepartment}</span>
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
                    {departments.map((department, idx) => (
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
                        value={department}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={classNames(
                                selected ? "font-medium" : "font-normal",
                                "block truncate"
                              )}
                            >
                              {department}
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

          {/* Branch Dropdown */}
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
          <button className="bg-blue-shadeb5 hover:bg-blue-shadeb5 text-white py-2 px-6 rounded-lg text-lg">
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  );
}
