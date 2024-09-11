export interface CourseDetails {
  code: string;
  name: string;
  credits: number;
  category: string;
  recommendedYear: string;
  prerequisites: {
    frontCourses: { code: string; name: string; term: string }[];
    allCourses: { code: string; name: string; term: string }[];
  };
}

interface CourseDetailsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  courseDetails: CourseDetails;
}

export default function CourseDetailsPopup({
  isOpen,
  onClose,
  courseDetails,
}: CourseDetailsPopupProps) {
  // Return null if the popup is not open, ensuring it only renders when needed
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-80 flex justify-center items-center z-50">
      {/* Overlay */}
      <div className="fixed inset-0" onClick={onClose}></div>

      {/* Popup Content */}
      <div className="bg-white rounded-xl p-12 w-full max-w-2xl shadow-2xl relative z-10">
        {/* Close Button */}
        <button
          onClick={onClose} // Call onClose when button is clicked
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-blue-shadeb05 rounded-[20px] p-2"
        >
          ✕
        </button>

        {/* Course Information */}
        <h2 className="text-lg font-semibold mb-4 text-center">
          รายละเอียดวิชา
        </h2>
        <div className="space-y-2 text-start text-black">
          <p>
            <strong>รหัสวิชา:</strong> {courseDetails.code}
          </p>
          <p>
            <strong>ชื่อวิชา:</strong> {courseDetails.name}
          </p>
          <p>
            <strong>หน่วยกิต:</strong> {courseDetails.credits}
          </p>
          <p>
            <strong>หมวดหมู่:</strong>{" "}
            <a className="text-blue-600 hover:underline">
              {courseDetails.category}
            </a>
          </p>
          <p>
            <strong>ปีและภาคเรียนที่แนะนำ:</strong>{" "}
            {courseDetails.recommendedYear}
          </p>
        </div>

        <hr className="my-4" />

        {/* Prerequisite Section */}
        <h3 className="font-semibold my-4">
          วิชาที่ต้องผ่านก่อน (Pre-Requisite)
        </h3>
        <div className="space-y-2 text-start">
          {/* Front Courses */}
          <div>
            <h4 className="text-base font-medium my-2">วิชาก่อนหน้า</h4>
            <ul className="list-disc ml-5">
              {courseDetails.prerequisites.frontCourses.map((course, idx) => (
                <li key={idx} className="text-blue-600">
                  {course.code} {course.name}{" "}
                  <span className="text-xs ml-2 px-2 py-1 rounded-full bg-blue-100 text-blue-600">
                    {course.term}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* All Required Courses */}
          <div>
            <h4 className="text-base font-medium">วิชาทั้งหมด</h4>
            <ul className="list-disc ml-5">
              {courseDetails.prerequisites.allCourses.map((course, idx) => (
                <li key={idx} className="text-blue-600 p-1">
                  {course.code} {course.name}{" "}
                  <span className="text-xs ml-2 px-2 py-1 rounded-full bg-blue-100 text-blue-600">
                    {course.term}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
