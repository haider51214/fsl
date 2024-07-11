import React from "react";
import style from "./singlePersonality.module.css";
import { Draggable, Droppable } from "react-beautiful-dnd";
const SinglePersonality = ({ title, detail, image, index, length }) => {
  return (
    <Droppable droppableId="personality-source">
      {(provided) => (
        <div
          style={{ width: "100%" }}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <Draggable
            draggableId={title}
            isDragDisabled={length === 4}
            index={index}
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.dragHandleProps}
                {...provided.draggableProps}
                className={style.main}
              >
                <div className={style.toast}>{detail}</div>

                <section className={style.section}>
                  <img src={image} alt="personality" className={style.img} />
                  <p className={style.title}>{title}</p>
                </section>
              </div>
            )}
          </Draggable>
        </div>
      )}
    </Droppable>
  );
};

export default SinglePersonality;
