import React from "react";

export default function JsonPreview({ schema }) {
  const convertToJSON = (fields) => {
    const result = {};

    fields.forEach((field) => {
      if (!field.name) return;

      if (field.type === "nested") {
        result[field.name] = convertToJSON(field.fields || []);
      } else {
        result[field.name] = field.type;
      }
    });

    return result;
  };

  return (
    <div className="p-4 border rounded-md bg-blue-500 h-full max-h-[500px] overflow-auto">
      <h3 className="font-bold  mb-2  text-xl text-black-800">Live JSON Preview</h3>
      <pre className="text-sm bg-white p-2 rounded-md overflow-x-auto">
        {JSON.stringify(convertToJSON(schema), null, 2)}
      </pre>
    </div>
  );
}
