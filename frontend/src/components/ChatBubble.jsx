import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Trash2, Pencil, Check } from "lucide-react";

const ChatBubble = ({
  sender,
  message,
  timestamp,
  isUser,
  onDelete,
  onEdit,
}) => {
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(message);

  const handleSave = () => {
    onEdit(editedText);
    setEditing(false);
  };

  return (
    <div
      className={`max-w-[75%] px-4 py-3 rounded-xl relative ${
        isUser ? "ml-auto bg-yellow-100 text-right" : "mr-auto bg-blue-100"
      }`}
    >
      {editing ? (
        <textarea
          className="w-full border rounded p-1 text-sm"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
      ) : (
        <p className="text-sm">{message}</p>
      )}

      <div className="flex justify-between items-center mt-1 text-gray-500 text-xs">
        <span>{sender === "user" ? "You" : "Bot"}</span>
        <span>
          {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
        </span>
      </div>

      {isUser && (
        <div className="absolute -top-1 -right-1 flex gap-1">
          {editing ? (
            <button onClick={handleSave}>
              <Check
                size={14}
                className="text-green-600 hover:text-green-800"
              />
            </button>
          ) : (
            <button onClick={() => setEditing(true)}>
              <Pencil size={14} className="text-gray-600 hover:text-blue-500" />
            </button>
          )}
          <button onClick={onDelete}>
            <Trash2 size={14} className="text-gray-600 hover:text-red-500" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
