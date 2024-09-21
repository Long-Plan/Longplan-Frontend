import React, { useEffect, useState } from "react";

// Define your interfaces here (updated for the new API structure)
interface ApiResponse {
  success: boolean;
  message: string;
  result: Result;
}

interface EnrollmentApiResponse {
  success: boolean;
  message: string;
  result: EnrollmentData[];
}

interface Result {
  id: number;
  name_th: string;
  name_en: string;
  at_least: boolean;
  credit: number;
  type_id: number;
  note: string;
  created_at: string;
  updated_at: string;
  requirements: Requirement[] | null;
  relationships: Relationship[] | null;
  child_categories: ChildCategory[] | null;
  courses: Course[] | null;
}

interface EnrollmentData {
  Year: string;
  Semester: string;
  Courses: EnrolledCourse[];
}

interface EnrolledCourse {
  CourseNo: string;
  Credit: string;
  Grade: string;
}

interface Requirement {
  id: number;
  regex: string;
  credit: number;
}

interface Relationship {
  id: number;
  child_category_id: number;
  require_all: boolean;
  position: number;
  cross_category_id: number | null;
}

interface ChildCategory {
  id: number;
  name_th: string;
  name_en: string;
  at_least: boolean;
  credit: number;
  type_id: number;
  note: string;
  created_at: string;
  updated_at: string;
  requirements: Requirement[] | null;
  relationships: Relationship[] | null;
  child_categories: ChildCategory[] | null;
  courses: Course[] | null;
}

interface Course {
  id: number;
  course_no: string;
  semester?: number;
  years?: number;
  credit: number;
  requisites: Requisite[] | null;
  detail: CourseDetail;
}

interface Requisite {
  id: number;
  related_course_no: string;
  requisite_type: string;
}

interface CourseDetail {
  id: number;
  course_no: string;
  title_long_th: string;
  title_long_en: string;
  course_desc_th: string;
  course_desc_en: string;
  credit: number;
  prerequisite: string;
  created_at: string;
  updated_at: string;
}

interface TypesAPIResponse {
  success: boolean;
  message: string;
  result: Type[];
}

interface Type {
  id: number;
  name_th: string;
  name_en: string;
}

// Component to fetch and display API data
const CategoryDetail: React.FC = () => {
  const [categoryData, setCategoryData] = useState<Result | null>(null);
  const [enrollmentData, setEnrollmentData] = useState<EnrollmentData[] | null>(
    null
  );
  const [typesData, setTypesData] = useState<Type[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch curriculum data
        const categoryResponse = await fetch(
          "http://10.10.182.135:8000/api/v1/categories/1"
        );
        if (!categoryResponse.ok) {
          throw new Error("Failed to fetch curriculum data");
        }
        const categoryData: ApiResponse = await categoryResponse.json();
        setCategoryData(categoryData.result);

        // Fetch enrollment data
        const enrollmentResponse = await fetch(
          "http://10.10.182.135:8000/api/v1/enrolled-courses/640612093"
        );
        if (!enrollmentResponse.ok) {
          throw new Error("Failed to fetch enrollment data");
        }
        const enrollmentData: EnrollmentApiResponse =
          await enrollmentResponse.json();
        setEnrollmentData(enrollmentData.result);

        // Fetch types data
        const typesResponse = await fetch(
          "http://10.10.182.135:8000/api/v1/categories/types"
        );
        if (!typesResponse.ok) {
          throw new Error("Failed to fetch types data");
        }
        const typesData: TypesAPIResponse = await typesResponse.json();
        setTypesData(typesData.result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getEnrollmentDetails = (courseNo: string) => {
    if (!enrollmentData) return null;

    for (const yearData of enrollmentData) {
      for (const course of yearData.Courses) {
        if (course.CourseNo === courseNo) {
          return course;
        }
      }
    }
    return null;
  };

  // Helper function to get the name of a category type by its `type_id`
  const getTypeNameById = (typeId: number): string => {
    const type = typesData?.find((t) => t.id === typeId);
    return type ? type.name_en : "Unknown Type";
  };

  // Calculate total credits for a category, starting from the leaf (courses)
  const calculateTotalCreditsForCategory = (
    category: ChildCategory | null
  ): number => {
    if (!category) return 0;

    // Calculate the total credits for the current category's courses
    const courseCredits = category.courses
      ? category.courses.reduce((sum, course) => {
          const enrolled = getEnrollmentDetails(course.course_no);
          return enrolled ? sum + course.credit : sum;
        }, 0)
      : 0;

    // Recursively calculate the total credits for all child categories
    const childCredits = category.child_categories
      ? category.child_categories.reduce(
          (sum, child) => sum + calculateTotalCreditsForCategory(child),
          0
        )
      : 0;

    return courseCredits + childCredits;
  };

  const renderCourses = (courses: Course[] | null) => {
    if (!courses || courses.length === 0) return null;

    return (
      <ul>
        {courses.map((course) => {
          const enrollment = getEnrollmentDetails(course.course_no);
          if (enrollment) {
            return (
              <li key={course.id} className="ml-8">
                {course.detail.title_long_en} - {course.credit} Credits - Grade:{" "}
                {enrollment.Grade}
              </li>
            );
          }
          return null; // Only render if enrolled
        })}
      </ul>
    );
  };

  const renderChildCategories = (childCategories: ChildCategory[] | null) => {
    if (!childCategories || childCategories.length === 0) return null;

    return (
      <ul>
        {childCategories.map((child) => {
          const totalChildCredits = calculateTotalCreditsForCategory(child);

          return (
            <li key={child.id}>
              <h3 className="text-blue-shadeb5 ml-4">{child.name_en}</h3>
              {renderCourses(child.courses)}
              {renderChildCategories(child.child_categories)}
              <p className="ml-4">
                <strong>
                  Total Credits in {child.name_en}: {totalChildCredits}
                </strong>
              </p>
            </li>
          );
        })}
      </ul>
    );
  };

  const renderCategoriesByType = () => {
    if (!categoryData || !categoryData.child_categories || !typesData)
      return null;

    const categoriesByType = categoryData.child_categories.reduce(
      (acc, category) => {
        const typeName = getTypeNameById(category.type_id);
        if (!acc[typeName]) acc[typeName] = [];
        acc[typeName].push(category);
        return acc;
      },
      {} as Record<string, ChildCategory[]>
    );

    return Object.keys(categoriesByType).map((typeName) => (
      <div key={typeName}>
        <h2 className="text-purple-600">{typeName}</h2>
        {categoriesByType[typeName].map((rootCategory) => {
          const totalRootCredits =
            calculateTotalCreditsForCategory(rootCategory);
          return (
            <div key={rootCategory.id}>
              <h1 className="text-red-500">{rootCategory.name_en}</h1>
              {renderChildCategories(rootCategory.child_categories)}
              <p>
                <strong className="text-green-600">
                  Total Credits in {rootCategory.name_en}: {totalRootCredits}
                </strong>
              </p>
            </div>
          );
        })}
      </div>
    ));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!categoryData) {
    return <div>No data found</div>;
  }

  return (
    <div className="bg-white p-4 rounded-[20px]">
      <h1>{categoryData.name_en}</h1>
      <p>Credits: {categoryData.credit}</p>
      <p>Note: {categoryData.note}</p>

      {/* Dynamically render categories by type */}
      {renderCategoriesByType()}
    </div>
  );
};

export default CategoryDetail;
