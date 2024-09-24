import React, { useEffect, useState } from "react";
import { useLoadingContext } from "react-router-loading";

function SelectStudyProgram() {
	const loadingContext = useLoadingContext();
	const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
		null
	);

	const plans = [
		{
			id: 1,
			name: "CPE Study Plan 2563",
			major: "CPE",
			year: "2563",
			plan: "normal",
			default: true,
			department: "Computer Engineering", // ภาควิชา
			program: "Computer Engineering - 2563", // หลักสูตร
			track: null, // สายการเรียน
		},
		{
			id: 2,
			name: "CPE COOP Plan 2563",
			major: "CPE",
			year: "2563",
			plan: "COOP",
			default: false,
			department: "Computer Engineering", // ภาควิชา
			program: "Computer Engineering - 2563", // หลักสูตร
			track: null, // สายการเรียน
		},
		{
			id: 3,
			name: "EE Study Plan 2561 ",
			major: "EE",
			year: "2561",
			plan: "normal",
			default: true,
			department: "Electrical Engineering", // ภาควิชา
			program: "Electrical Engineering - 2561", // หลักสูตร
			track: "ไฟฟ้ากำลัง", // สายการเรียน
		},
		{
			id: 4,
			name: "EE COOP Plan 2561",
			major: "Electrical Engineering",
			year: "2561",
			plan: "COOP",
			default: false,
			department: "Electrical Engineering", // ภาควิชา
			program: "Electrical Engineering - 2561", // หลักสูตร
			track: "ไฟฟ้าสื่อสาร", // สายการเรียน
		},
	];

	type Plan = {
		id: number;
		name: string;
		major: string;
		year: string;
		plan: string;
		default: boolean;
		department: string; // ภาควิชา
		program: string; // หลักสูตร
		track?: string | null; // สายการเรียน (ไม่จำเป็นต้องมี)
	};

	// const departments = Array.from(new Set(plans.map((plan) => plan.department)));
	const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
	const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
	const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

	// Extract unique values for dropdowns
	const departments = Array.from(new Set(plans.map((plan) => plan.department)));
	const programs = Array.from(
		new Set(
			plans
				.filter((plan) => plan.department === selectedDepartment)
				.map((plan) => plan.program)
		)
	);
	const tracks = Array.from(
		new Set(
			plans
				.filter((plan) => plan.program === selectedProgram)
				.map((plan) => plan.track)
		).add(null)
	);
	const planOptions = Array.from(
		new Set(
			plans
				.filter((plan) => plan.track === selectedTrack)
				.map((plan) => plan.plan)
		)
	);

	useEffect(() => {
		loadingContext.done();
	}, []);

	return (
		<div className="w-screen min-h-screen flex flex-col justify-center items-center">
			<div className="flex flex-col items-center sm:w-[40rem] md:w-[60rem] lg:w-[70rem] xl:w-[80rem] 2xl:w-[80rem] 3xl:w-[100rem] h-auto sm:h-[20rem] md:h-[30rem] lg:h-[35rem] xl:h-[38rem] 2xl:h-[38rem] 3xl:h-[60rem] bg-white rounded-2xl">
				<div className="text-black md:text-2xl text-base font-medium pt-8 md:pt-16 md:pb-6 pb-3">
					สร้างแพลนใหม่
				</div>
				<div className="w-full sm:w-[25rem] md:w-[33rem] lg:w-[37rem] xl:w-[40rem] 2xl:w-[40rem] h-auto sm:h-[15rem] md:h-[21rem] lg:h-[26rem] xl:h-[29rem] 2xl:h-[29rem] bg-white rounded-2xl border-2 border-[#b3b9ea]">
					<div className="text-center text-black sm:text-base md:text-lg lg:text-xl xl:text-xl font-bold py-2 md:py-5 flex flex-col items-center">
						เลือกแผนการเรียนที่ต้องการ
					</div>
					<div className="sm:h-[12.4rem] md:h-[16.6rem] lg:h-[21.6rem] xl:h-[24.6rem] 2xl:h-[24.6rem] overflow-y-scroll relative z-10">
						<div className="text-[#323334] text-sm md:text-lg font-medium pl-14 md:pl-28 py-1 flex flex-col items-start">
							ภาควิชา
						</div>
						<div className="flex flex-col items-center flex-shrink-0 pb-3">
							<select
								value={selectedDepartment || ""}
								onChange={(e) => {
									setSelectedDepartment(e.target.value);
									setSelectedProgram(null);
									setSelectedTrack(null);
									setSelectedPlan(null);
								}}
								className="w-4/6 pl-3 py-1 bg-white rounded-full border border-[#4351cc] text-[#4351cc] md:text-xl text-base font-bold"
							>
								<option value="">-- Select Department --</option>
								{departments.map((department, index) => (
									<option key={index} value={department}>
										{department}
									</option>
								))}
							</select>
						</div>
						<div className="text-[#323334] text-sm md:text-lg font-medium pl-14 md:pl-28 py-1 flex flex-col items-start">
							หลักสูตร
						</div>
						<div className="flex flex-col items-center flex-shrink-0 pb-3">
							<select
								value={selectedProgram || ""}
								onChange={(e) => {
									setSelectedProgram(e.target.value);
									setSelectedTrack(null);
									setSelectedPlan(null);
								}}
								className="w-4/6 pl-3 py-1 bg-white rounded-full border border-[#4351cc] text-[#4351cc] sm:text-base md:text-lg lg:text-xl xl:text-xl font-bold"
								disabled={!selectedDepartment}
							>
								{/* Computer Engineering (CPE) - 2563 */}
								<option value="">-- Select Program --</option>
								{programs.map((program, index) => (
									<option key={index} value={program}>
										{program}
									</option>
								))}
							</select>
						</div>
						{tracks.length > 1 && (
							<>
								<div className="text-[#323334] text-sm md:text-lg font-medium pl-14 md:pl-28 py-1 flex flex-col items-start">
									สาย
								</div>
								<div className="flex flex-col items-center flex-shrink-0 pb-3">
									<select
										value={selectedTrack || ""}
										onChange={(e) => setSelectedTrack(e.target.value)}
										className="w-4/6 pl-3 py-1 bg-white rounded-full border border-[#4351cc] text-[#4351cc] md:text-xl text-base font-bold"
										disabled={!selectedProgram}
									>
										<option value="">-- Select Track --</option>
										{tracks.map((track, index) => (
											<option key={index} value={track || ""}>
												{track}
											</option>
										))}
									</select>
								</div>
							</>
						)}
						<div className="text-[#323334] text-sm md:text-lg font-medium pl-14 md:pl-28 py-1 flex flex-col items-start">
							แผน
						</div>
						<div className="flex flex-col items-center flex-shrink-0 pb-3">
							<select
								value={selectedPlan || ""}
								onChange={(e) => setSelectedPlan(e.target.value)}
								className="w-4/6 pl-3 py-1 bg-white rounded-full border border-[#4351cc] text-[#4351cc] md:text-xl text-base font-bold"
								disabled={!selectedProgram}
							>
								<option value="">-- Select Plan --</option>
								{planOptions.map((plan, index) => (
									<option key={index} value={plan}>
										{plan}
									</option>
								))}
							</select>
						</div>
						{/* <div className="text-[#323334] text-sm md:text-lg font-medium pl-14 md:pl-28 py-1 flex flex-col items-start">
							แผน
						</div>
						<div className="flex flex-col items-center flex-shrink-0 pb-3">
							<div className="w-4/6 pl-3 py-1 bg-white rounded-full border border-[#4351cc] text-[#4351cc] sm:text-base md:text-lg lg:text-xl xl:text-xl font-bold">
								Computer Engineering (CPE) - 2563
							</div>
						</div>
						<div className="text-[#323334] text-sm md:text-lg font-medium pl-14 md:pl-28 py-1 flex flex-col items-start">
							แผน
						</div>
						<div className="flex flex-col items-center flex-shrink-0 pb-3">
							<div className="w-4/6 pl-3 py-1 bg-white rounded-full border border-[#4351cc] text-[#4351cc] sm:text-base md:text-lg lg:text-xl xl:text-xl font-bold">
								Computer Engineering (CPE) - 2563
							</div>
						</div> */}
						<div className="flex flex-col items-center flex-shrink-0 pt-6 pb-10">
							<div className="w-24 py-1 bg-[#4351cc] rounded-full text-center text-white text-sm md:text-lg font-medium">
								ตกลง
							</div>
						</div>
					</div>
					<div className="flex flex-row relative w-full">
						<img
							src="/public/imgs/SelectStudyProgram_1.svg"
							alt=""
							className="w-32 sm:w-44 md:w-56 lg:w-64 xl:w-72 absolute bottom-0 left-3 z-0"
						/>
						<img
							src="/public/imgs/SelectStudyProgram_2.svg"
							alt=""
							className="w-32 sm:w-44 md:w-56 lg:w-64 xl:w-72 absolute bottom-0 right-0 z-0"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SelectStudyProgram;
