import React, { useEffect, useState } from "react";
import { ReactComponent as Delete } from "../Components/assets/delete.svg";
import { ReactComponent as Revert } from "../Components/assets/revert.svg";
import { ReactComponent as Tick } from "../Components/assets/tick-green.svg";
import styled from "styled-components";

const ToDo = () => {
  const [state, setState] = useState({
    items: [
      {
        id: 1,
        title: "Buy 1 kg tomato",
      },
      {
        id: 2,
        title: "Buy 2 kg onion",
      },
      {
        id: 3,
        title: "Visit friend",
      },
      {
        id: 4,
        title: "Clean house",
      },
    ],
    completedItems: [
      {
        id: 5,
        title: "Washing Clothes",
      },
      {
        id: 6,
        title: "Play Cricket",
      },
      {
        id: 7,
        title: "1 km Walking",
      },
      {
        id: 8,
        title: "Do Homework",
      },
    ],
    idCounter: 0,
    input: "",
  });
  useEffect(() => {
    setState((prev) => ({
      ...prev,
      idCounter: state.completedItems.length + state.items.length,
    }));
  }, [state.completedItems.length, state.items.length]);

  const updateItem = () => {
    let new_item = {
      id: state.idCounter + 1,
      title: state.input,
    };
    if (state.input) {
      setState((prev) => ({
        ...prev,
        items: [...prev.items, new_item],
        input: "",
        idCounter: prev.idCounter + 1,
      }));
    }
  };

  const removeItems = (id) => {
    const { items } = state;
    const updatedItems = items.filter((item) => item.id !== id);
    setState((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };

  const completeItem = (id) => {
    const { items } = state;
    const itemToComplete = items.find((item) => item.id === id);
    if (itemToComplete) {
      const updatedItems = items.filter((item) => item.id !== id);
      setState((prev) => ({
        ...prev,
        items: updatedItems,
        completedItems: [...prev.completedItems, itemToComplete],
      }));
    }
  };

  const deleteCompletedItem = (id) => {
    const { completedItems } = state;
    const updatedCompletedItems = completedItems.filter(
      (item) => item.id !== id
    );
    setState((prev) => ({ ...prev, completedItems: updatedCompletedItems }));
  };

  const revertItem = (id) => {
    const { completedItems } = state;
    const itemToRevert = completedItems.find((item) => item.id === id);

    if (itemToRevert) {
      const updatedCompletedItems = completedItems.filter(
        (item) => item.id !== id
      );
      setState((prev) => ({
        ...prev,
        items: [...prev.items, itemToRevert],
        completedItems: updatedCompletedItems,
      }));
    }
  };

  const renderItems = () => {
    return state.items.map((item) => (
      <Li key={item.id}>
        <Divleft>
          <Checkbox1 onClick={() => completeItem(item.id)}></Checkbox1>
          <P1 onClick={() => completeItem(item.id)}>
            {item.id}, {item.title}{" "}
          </P1>
        </Divleft>
        <Divright>
          <Button onClick={() => removeItems(item.id)}>
            <Delete height={16} />
          </Button>
        </Divright>
      </Li>
    ));
  };

  const renderCompletedItems = () => {
    return state.completedItems.map((item) => (
      <Li className="li2" key={item.id}>
        <Divleft>
          <Checkbox2>
            <Tick
              style={{
                position: "absolute",
                top: "2",
                right: "0",
                height: "13",
                width: "13",
              }}
            />
          </Checkbox2>
          <P2>
            {item.id}, {item.title}{" "}
          </P2>
        </Divleft>
        <Divright>
          <Button onClick={() => revertItem(item.id)}>
            <Revert height={16} />
          </Button>
          <Button onClick={() => deleteCompletedItem(item.id)}>
            <Delete height={16} />
          </Button>
        </Divright>
      </Li>
    ));
  };

  return (
    <>
      <Main>
        <Heading1>ToDo List</Heading1>
        <Heading2>Things To Be Done</Heading2>
        <Ul>{renderItems()}</Ul>
        <Div>
          <Input
            placeholder=" Type new task..."
            value={state.input}
            onChange={(e) =>
              setState((prev) => ({ ...prev, input: e.target.value }))
            }
          />
          <ButtonSub onClick={updateItem}>Add New</ButtonSub>
        </Div>

        <Heading2>Completed</Heading2>
        <Ul>{renderCompletedItems()}</Ul>
      </Main>
    </>
  );
};

const Main = styled.section`
  width: 450px;
  margin: 0 auto;
  padding: 5px 100px;
  border-left: 1px solid grey;
  border-right: 1px solid grey;
  min-height: 100vh;
`;
const Heading1 = styled.h1`
  font-size: 34px;
  text-align: center;
`;
const Heading2 = styled.h2`
  font-size: 24px;
  color: #040241;
`;
const Ul = styled.ul``;

const Li = styled.li`
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
`;
const Divleft = styled.div`
  display: flex;
  align-items: center;
`;
const Divright = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Div = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  right: -12px;
`;
const Checkbox1 = styled.span`
  content: "";
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #fff;
  margin-right: 10px;
  margin-bottom: -16px;
  transform: translateY(-50%);
  border: 2px solid #000;
  &:hover {
    cursor: pointer;
  }
`;
const Checkbox2 = styled.span`
  content: "";
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #fff;
  margin-right: 10px;
  margin-bottom: -16px;
  transform: translateY(-50%);
  border: 2px solid #10c694;
`;
const P1 = styled.p`
  font-size: 19px;
  margin: 0;
  &:hover {
    cursor: pointer;
  }
`;
const P2 = styled.p`
  font-size: 19px;
  margin: 0;
  color: #10c694;
`;
const Button = styled.button`
  background: none;
  border: none;
  height: 16px;
  &:hover {
    cursor: pointer;
  }
`;
const ButtonSub = styled.button`
  border: none;
  width: 82px;
  height: auto;
  background-color: #040241;
  color: #fff;
  white-space: nowrap;
  border-radius: 6px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  &:hover {
    cursor: pointer;
  }
  padding: 12px 8px;
`;
const Input = styled.input`
  width: 75%;
  &::-webkit-input-placeholder {
    position: relative;
    padding-left: 20px;
    background-image: url(${require("../Components/assets/plus.svg").default});
    background-repeat: no-repeat;
    background-position: left center;
    background-size: 14px 14px;
  }
  padding: 10px 5px;
`;

export default ToDo;
