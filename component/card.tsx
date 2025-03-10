import React from "react";

export default function Card(props: any) {
  return (
    <div className="bg-white p-4 shadow-md rounded-md">
      <img
        src={props.image}
        alt={props.title}
        className="w-full h-32 object-cover rounded-md mb-2"
      />
      <h3 className="text-lg font-semibold">{props.title}</h3>
      <p className="text-gray-600">{props.price}</p>
    </div>
  );
}
