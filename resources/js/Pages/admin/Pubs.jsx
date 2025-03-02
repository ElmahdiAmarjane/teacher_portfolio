import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";

export default function MovableDivs() {
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("all"); // all, courses, tds, tps

  const [sections, setSections] = useState([
    {
      id: "courses",
      title: "📚 Courses",
      isOpen: true,
      items: [
        { id: "course-1", title: "React Basics", description: "Learn JSX, components, and state." },
        { id: "course-2", title: "Advanced React", description: "Hooks, context API, and state management." }
      ]
    },
    {
      id: "tds",
      title: "📝 TDs",
      isOpen: true,
      items: [{ id: "td-1", title: "React Exercises", description: "Practice React problems." }]
    },
    {
      id: "tps",
      title: "🛠️ TPs",
      isOpen: true,
      items: [{ id: "tp-1", title: "React Project", description: "Build a React app." }]
    }
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event, sectionId) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setSections((prevSections) =>
        prevSections.map((section) => {
          if (section.id === sectionId) {
            const oldIndex = section.items.findIndex((item) => item.id === active.id);
            const newIndex = section.items.findIndex((item) => item.id === over.id);
            return { ...section, items: arrayMove(section.items, oldIndex, newIndex) };
          }
          return section;
        })
      );
    }
  };

  const toggleSection = (sectionId) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId ? { ...section, isOpen: !section.isOpen } : section
      )
    );
  };

  // 🔍 **Filter Logic**
  const filteredSections = sections.map((section) => {
    if (filterType !== "all" && section.id !== filterType) return null; // Filter by type

    const filteredItems = section.items.filter(
      (item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase()) ||
        item.description.toLowerCase().includes(searchText.toLowerCase())
    );

    return { ...section, items: filteredItems };
  });

  return (
    <div className="p-5 w-full mx-auto">
      {/* 🔎 SEARCH BAR */}
      <div className="flex items-center space-x-3 mb-5">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="p-2 border border-gray-400 rounded"
        >
          <option value="all">🔍 All</option>
          <option value="courses">📚 Courses</option>
          <option value="tds">📝 TDs</option>
          <option value="tps">🛠️ TPs</option>
        </select>
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="p-2 w-full border border-gray-400 rounded"
        />
      </div>

      {/* 📦 SECTIONS (Filtered) */}
      {filteredSections.map((section) =>
        section ? (
          <div key={section.id} className="mb-4 border border-gray-300 rounded-lg shadow-lg">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full text-left p-3 bg-blue-500 text-white font-semibold flex justify-between items-center"
            >
              {section.title} <span>{section.isOpen ? "🔽" : "▶️"}</span>
            </button>

            {section.isOpen && section.items.length > 0 && (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={(event) => handleDragEnd(event, section.id)}
              >
                <SortableContext items={section.items} strategy={verticalListSortingStrategy}>
                  <div className="p-4 flex flex-col space-y-3">
                    {section.items.map((item) => (
                      <SortableItem key={item.id} item={item} />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}

            {section.isOpen && section.items.length === 0 && (
              <p className="p-4 text-gray-500">No results found.</p>
            )}
          </div>
        ) : null
      )}
    </div>
  );
}
