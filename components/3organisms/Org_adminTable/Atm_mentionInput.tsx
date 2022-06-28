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
    fontSize: 16,
    fontWeight: "normal",
    width: "24rem",
    padding: "0.25rem",
    margin: "0.25rem",
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

export default function App({ className, id, value, onChange }) {
  return (
    <MentionsInput
      markup="@[__display__](user:__id__)"
      id={id}
      value={value}
      onChange={onChange}
      className={className}
      singleLine={false}
      style={defaultStyle}
      placeholder={"Mention people using '@'"}
      a11ySuggestionsListLabel={"Suggested mentions"}
    >
      <Mention
        trigger="@"
        data={users}
        renderSuggestion={(suggestion, search, highlightedDisplay) => (
          <div className="user">{highlightedDisplay}</div>
        )}
        style={defaultStyle}
      />
    </MentionsInput>
  );
}
