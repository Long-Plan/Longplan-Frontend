// CreditCategory.tsx
const CreditCategory = ({
  title,
  bgColor,
  borderColor,
  textColor,
  children,
}: {
  title: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  children: React.ReactNode;
}) => (
  <div
    className={`flex flex-col gap-2 ${bgColor} p-2 rounded-[20px] border border-solid ${borderColor} mb-4 items-center`}
  >
    <p className={`${textColor} text-xs font-medium`}>{title}</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2">
      {children}
    </div>
  </div>
);

// CreditGroup.tsx
const CreditGroup = ({
  remainValue,
  groupName,
  renderRemainTotalBox,
}: {
  remainValue: number;
  groupName: string;
  renderRemainTotalBox: (remainValue: number, groupName: string) => JSX.Element;
}) => {
  return remainValue > 0 ? renderRemainTotalBox(remainValue, groupName) : null;
};

// RemainingCreditSection.tsx
const RemainingCreditSection = ({
  remainLearner,
  remainCocre,
  remainAct,
  remainElec,
  remainCore,
  remainMJreq,
  remainMJelec,
  remainFRtotal,
  remainGEtotal,
  remainMJtotal,
  renderRemainTotalBox,
}: {
  remainLearner: number;
  remainCocre: number;
  remainAct: number;
  remainElec: number;
  remainCore: number;
  remainMJreq: number;
  remainMJelec: number;
  remainFRtotal: number;
  remainGEtotal: number;
  remainMJtotal: number;
  renderRemainTotalBox: (remainValue: number, groupName: string) => JSX.Element;
}) => {
  return (
    <>
      {(remainLearner > 0 ||
        remainCocre > 0 ||
        remainAct > 0 ||
        remainElec > 0 ||
        remainCore > 0 ||
        remainMJreq > 0 ||
        remainMJelec > 0 ||
        remainFRtotal > 0) && (
        <div className="ml-4 flex flex-col bg-white rounded-[20px] p-4">
          <h2 className="m-2 mb-5 bg-gray-100 p-2 rounded-[20px] text-[14px] text-center">
            หน่วยกิตคงเหลือ
          </h2>
          <p className={`mb-4 text-center text-[12px] text-gray-500`}>
            วิชาที่ยังไม่ได้เรียน
          </p>

          <div className="grid grid-cols-auto justify-center items-center">
            {/* General Education */}
            {remainGEtotal > 0 &&
              remainLearner + remainCocre + remainAct + remainElec > 0 && (
                <CreditCategory
                  title="General Education"
                  bgColor="bg-yellow-50"
                  borderColor="border-amber-300"
                  textColor="text-collection-1-yellow-shade-y7"
                >
                  <CreditGroup
                    remainValue={remainLearner}
                    groupName="Learner Person"
                    renderRemainTotalBox={renderRemainTotalBox}
                  />
                  <CreditGroup
                    remainValue={remainCocre}
                    groupName="Co-Creator"
                    renderRemainTotalBox={renderRemainTotalBox}
                  />
                  <CreditGroup
                    remainValue={remainAct}
                    groupName="Active Citizen"
                    renderRemainTotalBox={renderRemainTotalBox}
                  />
                  <CreditGroup
                    remainValue={remainElec}
                    groupName="Elective"
                    renderRemainTotalBox={renderRemainTotalBox}
                  />
                </CreditCategory>
              )}

            {/* Major Requirements */}
            {remainMJtotal > 0 &&
              remainCore + remainMJreq + remainMJelec > 0 && (
                <CreditCategory
                  title="Major Requirements"
                  bgColor="bg-blue-shadeb05"
                  borderColor="border-blue-shadeb4"
                  textColor="text-blue-shadeb5"
                >
                  <CreditGroup
                    remainValue={remainCore}
                    groupName="Core"
                    renderRemainTotalBox={renderRemainTotalBox}
                  />
                  <CreditGroup
                    remainValue={remainMJreq}
                    groupName="Major Required"
                    renderRemainTotalBox={renderRemainTotalBox}
                  />
                  <CreditGroup
                    remainValue={remainMJelec}
                    groupName="Major Elective"
                    renderRemainTotalBox={renderRemainTotalBox}
                  />
                </CreditCategory>
              )}

            {/* Free Electives */}
            {remainFRtotal > 0 && (
              <CreditCategory
                title="Free Elective"
                bgColor="bg-neutral-100"
                borderColor="border-neutral-400"
                textColor="text-neutral-600"
              >
                <CreditGroup
                  remainValue={remainFRtotal}
                  groupName="Free Elective"
                  renderRemainTotalBox={renderRemainTotalBox}
                />
              </CreditCategory>
            )}
          </div>
        </div>
      )}
    </>
  );
};

// CourseRemainBox.tsx (MainComponent)
const CourseRemainBox = ({
  remainLearner,
  remainCocre,
  remainAct,
  remainElec,
  remainCore,
  remainMJreq,
  remainMJelec,
  remainFRtotal,
  remainGEtotal,
  remainMJtotal,
  renderRemainTotalBox,
}: {
  remainLearner: number;
  remainCocre: number;
  remainAct: number;
  remainElec: number;
  remainCore: number;
  remainMJreq: number;
  remainMJelec: number;
  remainFRtotal: number;
  remainGEtotal: number;
  remainMJtotal: number;
  renderRemainTotalBox: (remainValue: number, groupName: string) => JSX.Element;
}) => {
  return (
    <RemainingCreditSection
      remainLearner={remainLearner}
      remainCocre={remainCocre}
      remainAct={remainAct}
      remainElec={remainElec}
      remainCore={remainCore}
      remainMJreq={remainMJreq}
      remainMJelec={remainMJelec}
      remainFRtotal={remainFRtotal}
      remainGEtotal={remainGEtotal}
      remainMJtotal={remainMJtotal}
      renderRemainTotalBox={renderRemainTotalBox}
    />
  );
};

export default CourseRemainBox;
