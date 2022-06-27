import { useState } from "react";
import { MentionsInput, Mention } from "react-mentions";

const users = [
  {
    id: "walter",
    display: "Walter White",
  },
  {
    id: "satoshi2",
    display: "サトシ・ナカモト",
  },
  {
    id: "sung",
    display: "성덕선",
  },
  {
    id: "jesse",
    display: "Jesse Pinkman",
  },
];

const defaultStyle = {
  control: {
    backgroundColor: "#fff",
    fontSize: 14,
    fontWeight: "normal",
  },

  "&multiLine": {
    control: {
      fontFamily: "monospace",
      minHeight: 63,
    },
    highlighter: {
      padding: 9,
      border: "1px solid transparent",
    },
    input: {
      padding: 9,
      border: "1px solid silver",
    },
  },

  "&singleLine": {
    display: "inline-block",
    width: 180,

    highlighter: {
      padding: 1,
      border: "2px inset transparent",
    },
    input: {
      padding: 1,
      border: "2px inset",
    },
  },

  suggestions: {
    list: {
      backgroundColor: "white",
      border: "1px solid rgba(0,0,0,0.15)",
      fontSize: 14,
    },
    item: {
      padding: "5px 15px",
      borderBottom: "1px solid rgba(0,0,0,0.15)",
      "&focused": {
        backgroundColor: "#cee4e5",
      },
    },
  },
};

export default function App({ register, className, value }) {
  const [inputValue, setInputValue] = useState("");
  return (
    <>
      <MentionsInput
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          console.log(inputValue);
        }}
        className={className}
      >
        <Mention
          markup="@[__display__](user:__id__)"
          trigger="@"
          data={users}
          renderSuggestion={(suggestion, search, highlightedDisplay) => (
            <div className="user">{highlightedDisplay}</div>
          )}
          style={defaultStyle}
        />
      </MentionsInput>
    </>
  );
}
