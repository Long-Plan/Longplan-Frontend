import { useEffect } from "react";
import { useLoadingContext } from "react-router-loading";

function CreatePage() {
	const loadingContext = useLoadingContext();

	useEffect(() => {
		loadingContext.done();
	}, []);

	return (
		<div className="w-screen min-h-screen flex flex-col justify-center items-center">
			<div className="flex flex-col items-center sm:w-[40rem] md:w-[60rem] lg:w-[70rem] xl:w-[80rem] 2xl:w-[80rem] 3xl:w-[100rem] h-auto sm:h-[20rem] md:h-[30rem] lg:h-[35rem] xl:h-[38rem] 2xl:h-[38rem] 3xl:h-[60rem] bg-white rounded-2xl">
				<div className="text-black md:text-2xl text-base font-medium pt-8 md:pt-16">
					สร้างแพลนใหม่
				</div>
				<div className="group w-2/4 max-w-full md:w-1/3 md:h-16 h-10 mt-6 mb-12 bg-white hover:bg-gradient-to-r from-[#ecedf9] to-white border hover:border-2 border-[#e7e9fe] hover:border-[#4351cc] rounded-full flex items-center">
					<div className="w-10 md:w-[3.8rem] h-10 md:h-[3.8rem] bg-[#f3f4ff] group-hover:bg-gradient-to-br from-[#FFFFFF] to-[#4351CC] rounded-full border-2 group-hover:border-2 border-[#6873d6] group-hover:border-white flex justify-center items-center">
						<div className="text-center text-[#6873d6] group-hover:text-white text-xl md:text-3xl font-bold">
							+
						</div>
					</div>
					<div className="text-[#6873d6] text-base md:text-xl font-semibold ml-4">
						ลองแพลน
					</div>
				</div>
				<div className="w-11/12 md:w-2/3 flex flex-row">
					<div className="flex-grow text-black md:text-xl text-base text-center font-medium pb-7">
						แก้ไขแพลนของคุณ
					</div>
					<svg
						width="34"
						height="34"
						viewBox="0 0 34 34"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className=""
					>
						<circle cx="17" cy="17" r="17" fill="#DCD8D7" />
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M19.2351 6.82815C18.6651 4.39062 15.3349 4.39062 14.7649 6.82815C14.6798 7.19443 14.5129 7.53461 14.2777 7.821C14.0426 8.10739 13.7458 8.3319 13.4117 8.47626C13.0775 8.62062 12.7153 8.68075 12.3546 8.65176C11.9938 8.62277 11.6448 8.50548 11.3358 8.30943C9.27776 7.00316 6.92268 9.45632 8.17672 11.6001C8.98675 12.9845 8.26823 14.7908 6.75618 15.1736C4.41461 15.7658 4.41461 19.2362 6.75618 19.8268C7.10791 19.9156 7.43454 20.0896 7.70948 20.3347C7.98441 20.5799 8.19988 20.8892 8.33834 21.2375C8.47679 21.5858 8.53432 21.9632 8.50624 22.339C8.47815 22.7149 8.36525 23.0785 8.17672 23.4003C6.92268 25.5441 9.27776 27.9972 11.3358 26.691C11.6447 26.4946 11.9938 26.377 12.3546 26.3477C12.7154 26.3185 13.0778 26.3784 13.4122 26.5226C13.7465 26.6668 14.0435 26.8913 14.2788 27.1777C14.5141 27.4641 14.6812 27.8043 14.7664 28.1707C15.3349 30.6098 18.6666 30.6098 19.2336 28.1707C19.3191 27.8045 19.4863 27.4645 19.7217 27.1783C19.9571 26.8921 20.254 26.6678 20.5882 26.5236C20.9225 26.3794 21.2847 26.3195 21.6454 26.3485C22.0061 26.3776 22.3552 26.4949 22.6642 26.691C24.7222 27.9972 27.0773 25.5441 25.8233 23.4003C25.6351 23.0784 25.5225 22.7149 25.4945 22.3391C25.4666 21.9634 25.5242 21.5861 25.6626 21.2379C25.801 20.8897 26.0164 20.5804 26.2911 20.3352C26.5659 20.0901 26.8923 19.9159 27.2438 19.8268C29.5854 19.2346 29.5854 15.7642 27.2438 15.1736C26.8921 15.0848 26.5655 14.9108 26.2905 14.6657C26.0156 14.4205 25.8001 14.1112 25.6617 13.7629C25.5232 13.4146 25.4657 13.0372 25.4938 12.6613C25.5218 12.2855 25.6347 11.9219 25.8233 11.6001C27.0773 9.45632 24.7222 7.00316 22.6642 8.30943C22.3553 8.50581 22.0062 8.62341 21.6454 8.65267C21.2846 8.68192 20.9222 8.62199 20.5878 8.47777C20.2535 8.33355 19.9565 8.10911 19.7212 7.82272C19.4859 7.53633 19.3188 7.19609 19.2336 6.82972L19.2351 6.82815ZM17 22.1878C18.1935 22.1878 19.3381 21.6939 20.1821 20.8148C21.026 19.9357 21.5001 18.7434 21.5001 17.5002C21.5001 16.257 21.026 15.0647 20.1821 14.1856C19.3381 13.3065 18.1935 12.8126 17 12.8126C15.8065 12.8126 14.6619 13.3065 13.8179 14.1856C12.974 15.0647 12.4999 16.257 12.4999 17.5002C12.4999 18.7434 12.974 19.9357 13.8179 20.8148C14.6619 21.6939 15.8065 22.1878 17 22.1878Z"
							fill="#505152"
						/>
					</svg>
				</div>
				<div className="w-full h-72 flex flex-col items-center gap-4 overflow-y-scroll">
					<div className="w-11/12 md:w-2/3 h-12 md:h-14 border hover:border-2 border-[#d9dcf4] hover:border-[#4351cc] bg-white hover:bg-gradient-to-r from-[#ecedf9] to-white rounded-full flex items-center px-5 flex-shrink-0">
						<div className="w-1/2 text-[#4f5051] sm:text-base md:text-lg lg:text-xl xl:text-xl font-bold ">
							แพลน 1
						</div>
						<div className="w-1/2 flex justify-between items-center">
							<div className="text-[#4351cc] sm:text-xs md:text-sm lg:text-base xl:text-base font-bold">
								CPE63
							</div>
							<div className="text-[#8a8b8c] sm:text-xs md:text-sm lg:text-base xl:text-base font-normal">
								Edited 17/07/24, 17:00
							</div>
							<div className="h-6 px-2.5 rounded-full border border-[#f7c93b] justify-center items-center gap-3">
								<div className="text-[#f7c93b] text-sm md:text-base font-medium">
									Choosing
								</div>
							</div>
						</div>
					</div>
					<div className="w-11/12 md:w-2/3 h-12 md:h-14 border hover:border-2 border-[#d9dcf4] hover:border-[#4351cc] bg-white hover:bg-gradient-to-r from-[#ecedf9] to-white rounded-full flex items-center px-5 flex-shrink-0">
						<div className="w-1/2 text-[#4f5051] sm:text-base md:text-lg lg:text-xl xl:text-xl font-bold ">
							แพลน 2
						</div>
						<div className="w-1/2 flex justify-between items-center">
							<div className="text-[#4351cc] sm:text-xs md:text-sm lg:text-base xl:text-base font-bold">
								CPE63
							</div>
							<div className="text-[#8a8b8c] sm:text-xs md:text-sm lg:text-base xl:text-base font-normal">
								Edited 17/07/24, 17:00
							</div>
							{/* <div className="h-6 px-2.5 rounded-full border border-[#f7c93b] justify-center items-center gap-3">
								<div className="text-[#f7c93b] text-sm md:text-base font-medium">
									Choosing
								</div>
							</div> */}
						</div>
					</div>
					<div className="w-11/12 md:w-2/3 h-12 md:h-14 border hover:border-2 border-[#d9dcf4] hover:border-[#4351cc] bg-white hover:bg-gradient-to-r from-[#ecedf9] to-white rounded-full flex items-center px-5 flex-shrink-0">
						<div className="w-1/2 text-[#4f5051] sm:text-base md:text-lg lg:text-xl xl:text-xl font-bold ">
							แพลน 2
						</div>
						<div className="w-1/2 flex justify-between items-center">
							<div className="text-[#4351cc] sm:text-xs md:text-sm lg:text-base xl:text-base font-bold">
								CPE63
							</div>
							<div className="text-[#8a8b8c] sm:text-xs md:text-sm lg:text-base xl:text-base font-normal">
								Edited 17/07/24, 17:00
							</div>
							{/* <div className="h-6 px-2.5 rounded-full border border-[#f7c93b] justify-center items-center gap-3">
								<div className="text-[#f7c93b] text-sm md:text-base font-medium">
									Choosing
								</div>
							</div> */}
						</div>
					</div>
					<div className="w-11/12 md:w-2/3 h-12 md:h-14 border hover:border-2 border-[#d9dcf4] hover:border-[#4351cc] bg-white hover:bg-gradient-to-r from-[#ecedf9] to-white rounded-full flex items-center px-5 flex-shrink-0">
						<div className="w-1/2 text-[#4f5051] sm:text-base md:text-lg lg:text-xl xl:text-xl font-bold ">
							แพลน 2
						</div>
						<div className="w-1/2 flex justify-between items-center">
							<div className="text-[#4351cc] sm:text-xs md:text-sm lg:text-base xl:text-base font-bold">
								CPE63
							</div>
							<div className="text-[#8a8b8c] sm:text-xs md:text-sm lg:text-base xl:text-base font-normal">
								Edited 17/07/24, 17:00
							</div>
							{/* <div className="h-6 px-2.5 rounded-full border border-[#f7c93b] justify-center items-center gap-3">
								<div className="text-[#f7c93b] text-sm md:text-base font-medium">
									Choosing
								</div>
							</div> */}
						</div>
					</div>
					<div className="w-11/12 md:w-2/3 h-12 md:h-14 border hover:border-2 border-[#d9dcf4] hover:border-[#4351cc] bg-white hover:bg-gradient-to-r from-[#ecedf9] to-white rounded-full flex items-center px-5 flex-shrink-0">
						<div className="w-1/2 text-[#4f5051] sm:text-base md:text-lg lg:text-xl xl:text-xl font-bold ">
							แพลน 2
						</div>
						<div className="w-1/2 flex justify-between items-center">
							<div className="text-[#4351cc] sm:text-xs md:text-sm lg:text-base xl:text-base font-bold">
								CPE63
							</div>
							<div className="text-[#8a8b8c] sm:text-xs md:text-sm lg:text-base xl:text-base font-normal">
								Edited 17/07/24, 17:00
							</div>
							{/* <div className="h-6 px-2.5 rounded-full border border-[#f7c93b] justify-center items-center gap-3">
								<div className="text-[#f7c93b] text-sm md:text-base font-medium">
									Choosing
								</div>
							</div> */}
						</div>
					</div>
					<div className="w-11/12 md:w-2/3 h-12 md:h-14 border hover:border-2 border-[#d9dcf4] hover:border-[#4351cc] bg-white hover:bg-gradient-to-r from-[#ecedf9] to-white rounded-full flex items-center px-5 flex-shrink-0">
						<div className="w-1/2 text-[#4f5051] sm:text-base md:text-lg lg:text-xl xl:text-xl font-bold ">
							แพลน 2
						</div>
						<div className="w-1/2 flex justify-between items-center">
							<div className="text-[#4351cc] sm:text-xs md:text-sm lg:text-base xl:text-base font-bold">
								CPE63
							</div>
							<div className="text-[#8a8b8c] sm:text-xs md:text-sm lg:text-base xl:text-base font-normal">
								Edited 17/07/24, 17:00
							</div>
							{/* <div className="h-6 px-2.5 rounded-full border border-[#f7c93b] justify-center items-center gap-3">
								<div className="text-[#f7c93b] text-sm md:text-base font-medium">
									Choosing
								</div>
							</div> */}
						</div>
					</div>
					<div className="w-11/12 md:w-2/3 h-12 md:h-14 border hover:border-2 border-[#d9dcf4] hover:border-[#4351cc] bg-white hover:bg-gradient-to-r from-[#ecedf9] to-white rounded-full flex items-center px-5 flex-shrink-0">
						<div className="w-1/2 text-[#4f5051] sm:text-base md:text-lg lg:text-xl xl:text-xl font-bold ">
							แพลน 2
						</div>
						<div className="w-1/2 flex justify-between items-center">
							<div className="text-[#4351cc] sm:text-xs md:text-sm lg:text-base xl:text-base font-bold">
								CPE63
							</div>
							<div className="text-[#8a8b8c] sm:text-xs md:text-sm lg:text-base xl:text-base font-normal">
								Edited 17/07/24, 17:00
							</div>
							{/* <div className="h-6 px-2.5 rounded-full border border-[#f7c93b] justify-center items-center gap-3">
								<div className="text-[#f7c93b] text-sm md:text-base font-medium">
									Choosing
								</div>
							</div> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CreatePage;
