import React from 'react';
interface GroupedEnrolls {
  [year: string]: {
    [semester: string]: {
      year: string;
      semester: string;
      courseNo: string;
      credit: string;
      grade: string;
    }[];
  };
}

interface EnrollTableProps {
  groupedEnrolls: GroupedEnrolls;
}

const EnrollTable: React.FC<EnrollTableProps> = ({ groupedEnrolls }) => {
  // Extract unique semesters from the data
  const uniqueSemesters = Array.from(
    new Set(
      Object.values(groupedEnrolls).flatMap((semesters) =>
        Object.keys(semesters)
      )
    )
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Year</th>
          {uniqueSemesters.map((semester) => (
            <th key={semester}>{semester}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.entries(groupedEnrolls).map(([year, semesters]) => (
          <tr key={year}>
            <td>{year}</td>
            {uniqueSemesters.map((semester) => {
              const courses = semesters[semester] || [];
              return (
                <td key={`${year}-${semester}`}>
                  <table>
                    <tbody>
                      {courses.map((course, index) => (
                        <tr key={`${year}-${semester}-${index}`}>
                          <td>{course.courseNo}</td>
                          <td>{course.credit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EnrollTable;
