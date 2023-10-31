// CanvasWidget.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Assignment {
  id: number;
  name: string;
  // Add other properties as needed
}

interface Course {
  id: number;
  name: string;
  // Add other properties as needed
}

interface CanvasWidgetProps {
  courses: Course[];
}

const CanvasWidget: React.FC<CanvasWidgetProps> = ({ courses }) => {
  const [assignments, setAssignments] = useState<{ course: Course; assignments: Assignment[] }[]>([]);
  console.log('Courses:', courses);

  useEffect(() => {
    const fetchAssignments = async () => {
      const assignmentPromises = courses.map(async (course) => {
        try {
          const response = await axios.get<Assignment[]>(
            `https://fisd.instructure.com/api/v1/courses/${course.id}/assignments`
          );
          return { course, assignments: response.data };
        } catch (error) {
          console.error(`Error fetching assignments for course ${course.id}:`, error);
          return { course, assignments: [] as Assignment[] };
        }
      });

      const assignmentsData = await Promise.all(assignmentPromises);
      setAssignments(assignmentsData);
    };

    fetchAssignments();
  }, [courses]);

  return (
    <div>
      {assignments.map(({ course, assignments }) => (
        <div key={course.id}>
          <h2>{course.name}</h2>
          {assignments.length > 0 ? (
            <ul>
              {assignments.map((assignment) => (
                <li key={assignment.id}>{assignment.name}</li>
              ))}
            </ul>
          ) : (
            <p>No assignments found for this course.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default CanvasWidget;
