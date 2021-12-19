import React, { useEffect, useState } from "react";
import clsx from "clsx";

import { IoMdHeart, IoMdClose } from "react-icons/io";
import { IMessage, ITrack, IUser } from "../../interfaces/interfaces";
import { io } from "socket.io-client";
import { addMessage, setMessages } from "../../store/messageReducer";
import { MyTrack } from "./MyTrack";
import { Avatar } from "./Avatar";
import { UploadTrack } from "./UploadTrack";
import { DeleteTrack } from "./DeleteTrack";
import { Chat } from "./Chat";
import { Button, Col, Row, Table } from "react-bootstrap";

import * as styles from "./profile.module.scss";

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
  mainUrl: string;
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
  mainUrl,
}) => {
  useEffect(() => {
    dispatch(setTracks());
  }, [dispatch, setTracks, createTrack, deleteTrack]);

  let myTracks = tracks.filter((element) => user.tracks.includes(element._id));

  const [trackId, setTrackId] = useState<number>(0);

  const [showUpload, setShowUpload] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseUpload = () => setShowUpload(false);
  const handleShowUpload = () => setShowUpload(true);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  return (
    <Row className={clsx(styles.profile, "mb-5 pb-5")}>
      <Col xs={12} lg={6} className="d-flex flex-column mt-4">
        <UploadTrack
          dispatch={dispatch}
          createTrack={createTrack}
          refreshUser={refreshUser}
          setTracks={setTracks}
          infoTrackMsg={infoTrackMsg}
          trackLoading={trackLoading}
          showUpload={showUpload}
          handleCloseUpload={handleCloseUpload}
        />
        <DeleteTrack
          dispatch={dispatch}
          deleteTrack={deleteTrack}
          setTracks={setTracks}
          trackId={trackId}
          showDelete={showDelete}
          handleCloseDelete={handleCloseDelete}
        />
        <div className="d-flex mb-4">
          <Avatar
            mainUrl={mainUrl}
            dispatch={dispatch}
            uploadAvatar={uploadAvatar}
            refreshUser={refreshUser}
            user={user}
          />
          <div className="d-flex flex-column ms-4">
            <h4 className={styles.nickSubtitle}>Имя</h4>
            <h2 className={styles.nickTitle}>{user.nickname}</h2>
            <div className="d-flex flex-column flex-lg-row mt-2 mt-lg-4">
              <Button variant="outline-danger" onClick={handleShowUpload}>
                Загрузить трек
              </Button>
            </div>
          </div>
        </div>
        <h2 className={styles.title}>Мои треки</h2>
        {myTracks.length ? (
          <div className={styles.table}>
            <Table className=" mt-4">
              <thead>
                <tr>
                  <th scope="col" className={styles.head}>
                    #
                  </th>
                  <th scope="col" className={styles.head}>
                    Постер
                  </th>

                  <th scope="col" className={styles.head}>
                    Трек
                  </th>
                  <th scope="col" className={styles.head}>
                    <IoMdHeart />
                  </th>
                  <th scope="col" className={styles.head}>
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
                    handleShowDelete={handleShowDelete}
                  />
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <h4 className="text-white font-weight-bold mt-2">
            Нет загруженных треков...
          </h4>
        )}
      </Col>
      <Col
        xs={12}
        lg={6}
        className="d-flex justify-content-center align-items-center mt-4 mb-4 mb-lg-0"
      >
        <Chat
          user={user}
          dispatch={dispatch}
          messages={messages}
          addMessage={addMessage}
          setMessages={setMessages}
          mainUrl={mainUrl}
          io={io}
        />
      </Col>
    </Row>
  );
};
