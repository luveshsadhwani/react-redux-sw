import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateData } from "../src/app/counter/dataSlice";

const MessageBox = ({ id, name, email }) => (
  <div
    style={{
      backgroundColor: "lightblue",
      padding: "5px",
      marginBottom: "10px",
    }}
  >
    <h3>User {id || "ID"}</h3>
    <h5>{name}</h5>
    <h6>{email}</h6>
  </div>
);

export default function MessageBoard() {
  const counter = useSelector((state) => state.counter.value);
  const data = useSelector((state) => state.data.data);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`https://randomuser.me/api/?results=${counter}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(({ results }) => {
        // destructure data
        const data = results.map((ele) => ({
          id: ele.id.value,
          name: `${ele.name.first} ${ele.name.last}`,
          email: ele.email,
        }));

        dispatch(updateData(data));
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

  const renderMessageBoxes = () => {
    // generate array based on current count

    //
    return (
      <>
        {data.map((user, idx) => (
          <MessageBox
            key={user.id || `${user.id}-${idx}`}
            id={user.id}
            name={user.name}
            email={user.email}
          />
        ))}
      </>
    );
  };

  return (
    <div>
      <h2>User Board</h2>
      {renderMessageBoxes()}
    </div>
  );
}
