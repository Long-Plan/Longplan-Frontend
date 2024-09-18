import React, { useEffect, useState } from "react";
import axios from "axios";

// Define types for API response, Category, and Course
interface Course {
  id: number;
  course_no: string;
  semester?: number;
  years?: number;
  requisites: any;
}

interface Relationship {
  id: number;
  child_category_id: number;
}

interface Requirement {
  id: number;
  regex: string;
  credit: number;
}

interface Category {
  id: number;
  name_en: string;
  credit: number;
  at_least: number;
  type_id: number;
  note: string;
  courses: Course[] | null;
  relationships: Relationship[] | null;
  requirements: Requirement[] | null;
}

interface APIResponse {
  success: boolean;
  message: string;
  result: Category[];
}

const API_URL = "http://10.10.182.135:8000/api/v1/categories/1";

const CategoryTree: React.FC = () => {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryJson, setCategoryJson] = useState<object | null>(null);

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get<APIResponse>(API_URL);
      const sortedCategories = response.data.result.sort((a, b) => a.id - b.id); // Sort categories by ID
      setCategories(sortedCategories);
      setError(null);
    } catch (err) {
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Build JSON recursively for categories
  const buildCategoryJson = (
    category: Category,
    allCategories: Category[]
  ): object => {
    const childCategories = category.relationships
      ? category.relationships
          .map((rel) => {
            const childCategory = allCategories.find(
              (cat) => cat.id === rel.child_category_id
            );
            return childCategory
              ? buildCategoryJson(childCategory, allCategories)
              : null;
          })
          .filter(Boolean) // Remove nulls
      : [];

    return {
      id: category.id,
      name: category.name_en,
      credit: category.credit,
      note: category.note,
      type_id: category.type_id,
      courses: category.courses || [],
      subcategories: childCategories,
    };
  };

  useEffect(() => {
    if (categories && categories.length > 0) {
      // Ensure categories is not null
      const rootCategory = categories.find((category) => category.id === 1); // Root category (ID 1)
      if (rootCategory) {
        const resultJson = buildCategoryJson(rootCategory, categories);
        setCategoryJson(resultJson);
      }
    }
  }, [categories]);

  const handleCopyToClipboard = () => {
    if (categoryJson) {
      navigator.clipboard
        .writeText(JSON.stringify(categoryJson, null, 2))
        .then(() => {})
        .catch(() => {
          alert("Failed to copy JSON.");
        });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={styles.container as React.CSSProperties}>
      <h1>Course Categories JSON</h1>
      {categoryJson && (
        <>
          <pre style={styles.jsonOutput as React.CSSProperties}>
            {JSON.stringify(categoryJson, null, 2)}
          </pre>
          <button style={styles.copyButton} onClick={handleCopyToClipboard}>
            Copy JSON
          </button>
        </>
      )}
    </div>
  );
};

// CSS Styling
const styles = {
  container: {
    maxWidth: "1000px",
    margin: "20px auto",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    overflowWrap: "break-word", // Break long words to prevent overflow
    fontFamily: "'Roboto', sans-serif",
    color: "#333",
  },
  jsonOutput: {
    backgroundColor: "#f4f4f4",
    color: "#2b2b2b",
    fontFamily: "'Courier New', Courier, monospace", // Monospace font for JSON
    padding: "15px",
    borderRadius: "6px",
    overflowX: "auto",
    whiteSpace: "pre-wrap", // Ensure new lines wrap properly
    wordWrap: "break-word", // Handle long words inside JSON
    lineHeight: "1.6",
    maxHeight: "700px", // Limit the height to avoid large overflow
    marginBottom: "20px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },
  copyButton: {
    padding: "10px 20px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    fontWeight: "bold",
  },
  copyButtonHover: {
    backgroundColor: "#45a049",
  },
};

export default CategoryTree;
