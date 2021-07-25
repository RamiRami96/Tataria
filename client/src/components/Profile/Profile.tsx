import React, { useEffect, useState } from "react";

import { IoMdHeart, IoMdClose } from "react-icons/io";
import { mainUrl } from "../../api/api";
import { IMessage, ITrack, IUser } from "../../interfaces/interfaces";
import { io } from "socket.io-client";
import { addMessage, setMessages } from "../../store/messageReducer";
import { MyTrack } from "./MyTrack";
import { Avatar } from "./Avatar";
import { UploadTrack } from "./UploadTrack";
import { DeleteTrack } from "./DeleteTrack";
import { Chat } from "./Chat";

// компонента профиля

interface IProfileProps {
  tracks: ITrack[];
  messages: IMessage[];
  dispatch: Function;
  setTracks: Function;
  createTrack: Function;
  deleteTrack: Function;
  uploadAvatar: Function;
  user: IUser;
  infoTrackMsg: string;
  trackLoading: boolean;
  refreshUser: Function;
}

export const Profile: React.FC<IProfileProps> = ({
  tracks,
  messages,
  dispatch,
  setTracks,
  createTrack,
  deleteTrack,
  uploadAvatar,
  user,
  infoTrackMsg,
  trackLoading,
  refreshUser,
}) => {
  useEffect(() => {
    dispatch(setTracks());
  }, [dispatch, setTracks, createTrack, deleteTrack]);

  // фильтрация своих треков из всех
  let myTracks = tracks.filter((element) => user.tracks.includes(element._id));

  // id трека нужный для удаления трека
  const [trackId, setTrackId] = useState(0);

  return (
    <div className="row profile mb-5 pb-5">
      <div className="col-12 col-lg-6 d-flex flex-column mt-4">
        <UploadTrack
          dispatch={dispatch}
          createTrack={createTrack}
          refreshUser={refreshUser}
          setTracks={setTracks}
          infoTrackMsg={infoTrackMsg}
          trackLoading={trackLoading}
        />
        <DeleteTrack
          dispatch={dispatch}
          deleteTrack={deleteTrack}
          setTracks={setTracks}
          trackId={trackId}
        />
        <div className="d-flex profile__info mb-4">
          <Avatar
            mainUrl={mainUrl}
            dispatch={dispatch}
            uploadAvatar={uploadAvatar}
            refreshUser={refreshUser}
            user={user}
          />
          <div className="d-flex flex-column ms-4">
            <h4>Имя</h4>
            <h2>{user.nickname}</h2>
            <div className="d-flex flex-column flex-lg-row mt-2 mt-lg-4">
              <button
                className="btn btn-outline-danger "
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Загрузить трек
              </button>
            </div>
          </div>
        </div>
        <h1>Мои треки</h1>
        {myTracks.length ? (
          <div className="profile__table-container">
            <table className="table mt-4">
              <thead>
                <tr>
                  <th scope="col" className="head">
                    #
                  </th>
                  <th scope="col" className="head">
                    Постер
                  </th>

                  <th scope="col" className="head">
                    Трек
                  </th>
                  <th scope="col" className="head">
                    <IoMdHeart />
                  </th>
                  <th scope="col" className="head">
                    <IoMdClose />
                  </th>
                </tr>
              </thead>

              <tbody>
                {myTracks.reverse().map((track: ITrack, index: number) => (
                  <MyTrack
                    key={track._id}
                    index={index}
                    track={track}
                    mainUrl={mainUrl}
                    setTrackId={setTrackId}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h4 className="text-white font-weight-bold mt-2">
            Нет загруженных треков...
          </h4>
        )}
      </div>
      <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center profile__chat mt-4 mb-4 mb-lg-0">
        <Chat
          user={user}
          dispatch={dispatch}
          messages={messages}
          addMessage={addMessage}
          setMessages={setMessages}
          mainUrl={mainUrl}
          io={io}
        />
      </div>
    </div>
  );
};
