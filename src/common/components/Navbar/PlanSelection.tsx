import { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const plans = [
  {
    id: 1,
    name: "CPE Study Plan 2563",
    major: "CPE",
    year: "2563",
    plan: "normal",
    default: true,
  },
];

type Plan = {
  name: string;
  major: string;
  year: string;
  plan: string;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function PlanSelection({
  onPlanChange,
}: {
  onPlanChange: (plan: any) => void;
}) {
  const [selected, setSelected] = useState<Plan>(plans[0]);

  const handleChange = (plan: Plan) => {
    setSelected(plan);
    onPlanChange({
      name: plan.name,
      major: plan.major,
      year: plan.year,
      plan: plan.plan,
    });
  };

  return (
    <div className="plan-select w-screen">
      <div className="mx-auto flex justify-between items-center pb-10 gap-6 mt-12">
        <h1>หลักสูตรการศึกษา</h1>
        <div className="relative">
          <Listbox value={selected} onChange={handleChange}>
            {({ open }) => (
              <>
                <Listbox.Button className="relative w-auto h-[40px] cursor-hover rounded-3xl bg-white py-0 pl-3 pr-12 text-left border-2 border-solid border-blue-shadeb5 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 md:text-md ">
                  <span className="flex items-center">
                    <span
                      className={classNames(
                        "ml-3 block truncate",
                        "font-bold text-blue-shadeb5 "
                      )}
                    >
                      {selected.name}
                    </span>
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-blue-shadeb3"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-5 ring-black ring-opacity-5 focus:outline-none md:text-md">
                    {plans.map((plan) => (
                      <Listbox.Option
                        key={plan.id}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "bg-gray-100 text-blue-shadeb4"
                              : "text-gray-900",
                            "relative cursor-default select-none py-2 pl-3 pr-9"
                          )
                        }
                        value={plan}
                      >
                        {({ selected, active }) => (
                          <>
                            <div className="flex items-center">
                              <span
                                className={classNames(
                                  selected
                                    ? "font-bold text-blue-shadeb5"
                                    : "font-normal",
                                  "ml-3 block truncate"
                                )}
                              >
                                {plan.name}
                              </span>
                            </div>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? "blue-shadeb5" : "text-blue-shadeb3",
                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
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
              </>
            )}
          </Listbox>
        </div>
      </div>
    </div>
  );
}
