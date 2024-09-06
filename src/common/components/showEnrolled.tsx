import React, { useEffect, useState } from 'react';
import EnrollTable from './enrollsSubject';// Import the EnrollTable component

// ... your other imports

// Add this type definition in your code

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
  

const  Enrolled: React.FC = () => {
  const [groupedEnrolls, setGroupedEnrolls] = useState<GroupedEnrolls | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/src/640612097-grouped-enrolled.json');
        const data = await response.json();
        setGroupedEnrolls(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!groupedEnrolls) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Your other components */}
      <EnrollTable groupedEnrolls={groupedEnrolls} />
    </div>
  );
};

export default Enrolled;
