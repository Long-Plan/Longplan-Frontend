import { useEffect } from "react";
import { useLoadingContext } from "react-router-loading";

function CreatePage() {
  const loadingContext = useLoadingContext();

  useEffect(() => {
    loadingContext.done();
  }, []);

  return (
    <div
      className="w-screen flex flex-col justify-center items-center h-screen "
      style={{
        fontFamily: "IBM Plex Sans Thai, sans-serif",
        backgroundColor: "#F5F5F5",
        overflowX: "hidden",
      }}
    >
      <div className="bg-white rounded-[20px] px-32 py-16">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          สร้างแพลนใหม่
        </h2>
        <div className="flex justify-center">
          <div className="rounded-full border xl:w-[650px] h-[80px] my-8 flex justify-start items-center">
            <div className="rounded-full border-2 bg-blue-shadeb05 border-blue-shadeb4 w-[80px] h-[80px] text-center items-center justify-items-center">
              <h1 className="font-bold text-blue-shadeb4 text-5xl mt-[15px]">
                +
              </h1>
            </div>
            <h1 className="px-4 text-blue-shadeb4">ลองแพลน</h1>
          </div>
        </div>
        <p className="text-xl text-gray-800 text-center mb-4">
          แก้ไขแพลนของคุณ
        </p>

        <div className="rounded-full border xl:w-[1000px] h-[60px] my-4 flex justify-start items-center">
          <table className="rounded-full w-[1000px] my-8">
            <tr>
              <td className="px-8 text-gray-800 text-xl font-bold">ลองแพลน</td>
              <td className="pl-20 text-blue-shadeb5 text-xl font-bold items-end justify-end">
                CPE
              </td>
              <td className=" text-gray-500 text-md">Edited 17/07/24, 17:00</td>
              <td className="text-collection-1-yellow-shade-y5 rounded-full text-md font-bold">
                status
              </td>
            </tr>
          </table>
        </div>

        <div className="rounded-full border xl:w-[1000px] h-[60px] my-4 flex justify-start items-center">
          <table className="rounded-full w-[1000px] my-8">
            <tr>
              <td className="px-8 text-gray-800 text-xl font-bold">ลองแพลน</td>
              <td className="pl-20 text-blue-shadeb5 text-xl font-bold items-end justify-end">
                CPE
              </td>
              <td className=" text-gray-500 text-md">Edited 17/07/24, 17:00</td>
              <td className="text-collection-1-yellow-shade-y5 rounded-full text-md font-bold">
                status
              </td>
            </tr>
          </table>
        </div>

        <div className="rounded-full border xl:w-[1000px] h-[60px] my-4 flex justify-start items-center">
          <table className="rounded-full w-[1000px] my-8">
            <tr>
              <td className="px-8 text-gray-800 text-xl font-bold">ลองแพลน</td>
              <td className="pl-20 text-blue-shadeb5 text-xl font-bold items-end justify-end">
                CPE
              </td>
              <td className=" text-gray-500 text-md">Edited 17/07/24, 17:00</td>
              <td className="text-collection-1-yellow-shade-y5 rounded-full text-md font-bold">
                status
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
