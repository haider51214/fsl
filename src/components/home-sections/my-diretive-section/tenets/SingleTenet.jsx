import React, { useEffect } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import style from "./singleTenet.module.css";
const SingleTenet = ({ img, title, detail, index, length }) => {
  return (
    <Droppable droppableId="tenet-source">
      {(provided) => (
        <div
          style={{ width: "100%" }}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <Draggable
            isDragDisabled={length === 1}
            draggableId={title}
            index={index}
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.dragHandleProps}
                {...provided.draggableProps}
                className={style.main}
              >
                <div className={length === 0 ? style.fixed : style.section}>
                  <img src={img} alt="tenet" className={style.tenetImg} />
                  <p className={style.tenetTitle}>{title}</p>
                  <p className={style.tenetdetail}>{detail}</p>
                </div>
              </div>
            )}
          </Draggable>
        </div>
      )}
    </Droppable>
  );
};

export default SingleTenet;
