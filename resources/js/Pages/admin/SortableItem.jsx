import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import logo from "@/assets/images/logo.png";

export function SortableItem({ item }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="p-3 bg-white shadow-md border rounded cursor-grab">
      <h3 className="font-semibold">{item.title}</h3>
      <p className="text-gray-600">{item.description}</p>
      <input type="text" />
      <input type="text" />
      <input type="text" />
      <img src={logo} alt="" />
    </div>
  );
}
