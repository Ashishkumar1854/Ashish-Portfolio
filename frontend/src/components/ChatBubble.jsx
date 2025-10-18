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
    if (onEdit) onEdit(editedText);
    setEditing(false);
  };

  return (
    <div
      className={`max-w-[75%] px-4 py-2 rounded-xl relative break-words ${
        isUser
          ? "ml-auto bg-yellow-100 text-right shadow-sm"
          : "mr-auto bg-blue-100 text-left shadow-sm"
      }`}
    >
      {editing ? (
        <textarea
          className="w-full border rounded p-1 text-sm resize-none"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
      ) : (
        <p className="text-sm">{message}</p>
      )}

      <div className="flex justify-between items-center mt-1 text-gray-400 text-xs">
        <span>{isUser ? "You" : "Bot"}</span>
        <span>
          {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
        </span>
      </div>

      {isUser && (onEdit || onDelete) && (
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
          {onDelete && (
            <button onClick={onDelete}>
              <Trash2 size={14} className="text-gray-600 hover:text-red-500" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
