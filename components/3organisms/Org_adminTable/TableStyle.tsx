import styled from "styled-components";

const TableStyle = styled.div`
  width: max-content;
  margin: 0 1rem;
  table {
    border-spacing: 0;
    border: 1px solid #d1d5db;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th {
      text-align: start;
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid #d1d5db;
      border-right: 1px solid #d1d5db;
      :last-child {
        border-right: 0;
      }
    }
  }
`;

function App({ children }) {
  return (
    <div className="bg-gray-50 w-full  overflow-x-scroll middle-scroll">
      <TableStyle>{children}</TableStyle>
    </div>
  );
}

export default App;
