import { MapPin } from "lucide-react";

export function InteractiveMap({ scales, onViewScale }) {
  return (
    <div className="bg-white shadow rounded-xl p-4" style={{ height: "400px" }}>
      {scales.map((scale) => (
        <div key={scale.scale_id} className="flex items-center gap-2 cursor-pointer mb-2" onClick={() => onViewScale(scale.scale_id)}>
          <MapPin size={16} />
          <span>{scale.location_name} - {scale.status}</span>
        </div>
      ))}
    </div>
  );
}
