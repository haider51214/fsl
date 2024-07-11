import React, { useEffect, useState } from "react";
import style from "./myDirective.module.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import httpAction from "../../../store/action/httpAction";
import apis from "../../../store/utils/apis";
import { useDispatch, useSelector } from "react-redux";
import SingleTenet from "./tenets/SingleTenet";
import SinglePersonality from "./single-personality/SinglePersonality";
import userPotrate from "../../../assts/potrate.png";
import { CircularProgress } from "@mui/material";
import { CiCircleRemove } from "react-icons/ci";
const MyDirective = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.ui.loading);

  const [useAllTenets, setUSerAllTenets] = useState();
  const [userAllPersonalities, setUserAllPersonalities] = useState();
  const [selectedPer, setSelectedPer] = useState([]);
  const [dummyPer, setDummyPer] = useState([1, 2, 3, 4]);
  const [selectedTen, setSelectedTen] = useState([]);

  const [isTenet, setIsTenet] = useState(false);
  const [isPerso, setIsPerso] = useState(false);

  const apisList = apis();

  // data for user all tenets
  const dataGetUserAllTenets = {
    url: apisList.getUserTotalTenets,
    method: "POST",
    body: { userId: apisList.userId },
  };

  // function to get user all tenets
  const getUserAllTenets = async () => {
    setIsTenet(true);
    const result = await dispatch(httpAction(dataGetUserAllTenets));
    setUSerAllTenets(result?.list);
    setIsTenet(false);
  };

  // data to get user all personalities
  const dataGetUSerAllPersonalities = {
    url: apisList.userTotalPersonalities,
    method: "POST",
    body: { userId: apisList.userId },
  };

  // function to get user all personalities
  const getUserAllPersonalities = async () => {
    setIsPerso(true);
    const result = await dispatch(httpAction(dataGetUSerAllPersonalities));
    console.log(result)
    setUserAllPersonalities(result?.list);
    setIsPerso(false);
  };

  // to add user single personality
  const addUserSinglePersonallity = async (id) => {
    setIsPerso(true);
    const addSinglePersonalityData = {
      url: apisList.addUserPersonality,
      method: "POST",
      body: { userId: apisList.userId, perId: id },
    };

    await dispatch(httpAction(addSinglePersonalityData));
    await getUserSelectedPersonality();
    await getUserAllPersonalities();
    setIsPerso(false);
  };

  // data to get user selected personality
  const dataUserSelectedPersonality = {
    url: apisList.userPersonalityList,
    method: "POST",
    body: { userId: apisList.userId },
  };

  const getUserSelectedPersonality = async () => {
    const result = await dispatch(httpAction(dataUserSelectedPersonality));
    setSelectedPer(result?.list);
  };

  // data to get user selected tenet
  const dataUserSelectedTenet = {
    url: apisList.getUserTenetsList,
    method: "POST",
    body: { userId: apisList.userId },
  };

  const getUserSelectedTenet = async () => {
    const result = await dispatch(httpAction(dataUserSelectedTenet));
    // console.log(result);
    setSelectedTen(result?.list);
  };

  const addUserTene = async (id) => {
    setIsTenet(true);

    const dataToAddUserTenet = {
      url: apisList.addUserTenet,
      method: "POST",
      body: { userId: apisList.userId, tenId: id },
    };

    await dispatch(httpAction(dataToAddUserTenet));
    setIsTenet(false);
  };

  useEffect(() => {
    getUserAllPersonalities();
    getUserSelectedPersonality();
    // getUserTenets();
    getUserAllTenets();
    getUserSelectedTenet();
  }, []);

  // to delete user tenet
  const userTenDeleteHandler = async (id) => {
    setIsTenet(true);
    const deleteUserTenData = {
      url: apisList.deleteUserTenet,
      method: "POST",
      body: { userId: apisList.userId, tenId: id },
    };

    await dispatch(httpAction(deleteUserTenData));
    await getUserAllTenets();
    await getUserSelectedTenet();
    setIsTenet(false);
  };

  const deltePerHandler = async (id) => {
    setIsPerso(true);
    const deletePerData = {
      url: apisList.deleteUserPersonality,
      method: "POST",
      body: { userId: apisList.userId, perId: id },
    };

    await dispatch(httpAction(deletePerData));
    await getUserAllPersonalities();
    await getUserSelectedPersonality();
    setIsPerso(false);
  };

  const dragEnd = async (result) => {
    const { source, destination } = result;

    if (!source || !destination) return;

    // send add user personality request
    if (
      source.droppableId === "personality-source" &&
      destination.droppableId === "personality"
    ) {
      const personalityId = [...userAllPersonalities].find(
        (li) => li.title === result.draggableId
      ).id;
      await addUserSinglePersonallity(personalityId);
      await getUserAllPersonalities();
    } // end here

    // to add use tenet
    if (
      destination.droppableId === "tenet" &&
      source.droppableId === "tenet-source"
    ) {
      const findedTenId = [...useAllTenets].find(
        (item) => item.title === result.draggableId
      ).id;

      await addUserTene(findedTenId);
      getUserAllTenets();
      getUserSelectedTenet();
    } //end here
  };

  const dragStartHandler = () => {
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
  };

  return (
    <DragDropContext onDragStart={dragStartHandler} onDragEnd={dragEnd}>
      <div className={style.main}>
        <section className={style.section}>
          <div className={style.row}>
            <div className={style.col}>
              {isLoading && isTenet ? (
                <div className={style.loading}>
                  <CircularProgress />
                </div>
              ) : (
                useAllTenets &&
                useAllTenets.map((ten, index) => (
                  <SingleTenet
                    length={selectedTen?.length}
                    title={ten.title}
                    detail={ten.detail}
                    img={ten.image}
                    index={index}
                  />
                ))
              )}
            </div>

            <div className={style.col}>
              <div className={style.userInfo}>
                <img src={userPotrate} alt="user" className={style.userImg} />
                <p>My Directive</p>
              </div>
              <Droppable droppableId="tenet">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={style.tenets}
                  >
                    <p>My Core Tenet</p>
                    {selectedTen &&
                      selectedTen.map((item, index) => {
                        return (
                          <div key={index} className={style.userTen}>
                            <CiCircleRemove
                              onClick={() => userTenDeleteHandler(item.id)}
                              className={style.userTenIcon}
                            />
                            <img
                              src={item.image}
                              alt="ten"
                              className={style.userTenImg}
                            />
                            <p className={style.userTenTitle}>{item.title}</p>
                            <p className={style.userTenDetail}>{item.detail}</p>
                          </div>
                        );
                      })}
                  </div>
                )}
              </Droppable>

              <Droppable droppableId="personality">
                {(provided) => (
                  <div
                    className={style.styles}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div className={style.styles}>
                      {selectedPer &&
                        selectedPer.map((item, index) => {
                          return (
                            <div className={style.selectedPer} key={index}>
                              <CiCircleRemove
                                onClick={() => deltePerHandler(item.id)}
                                className={style.perRmIcon}
                              />
                              <img
                                src={item.image}
                                className={style.perImage}
                                alt="personality"
                              />
                              <p className={style.perTitle}>{item.title}</p>
                              {/* <p className={style.perDetail}>{item.detail}</p> */}
                            </div>
                          );
                        })}
                      {dummyPer
                        .slice(parseFloat(selectedPer.length), 4)
                        .map((item, index) => {
                          return (
                            <div key={index} className={style.item}>
                              <p>Leadership style {item}</p>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
              </Droppable>
            </div>
            <div className={style.col}>
              {isLoading && isPerso ? (
                <div className={style.loading}>
                  <CircularProgress />
                </div>
              ) : (
                userAllPersonalities &&
                userAllPersonalities.map((li, index) => (
                  <SinglePersonality
                    title={li.title}
                    image={li.image}
                    detail={li.detail}
                    index={index}
                    length={selectedPer?.length}
                  />
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </DragDropContext>
  );
};

export default MyDirective;
