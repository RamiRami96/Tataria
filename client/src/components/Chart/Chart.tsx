import clsx from "clsx";
import React, { Dispatch } from "react";
import { useEffect } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { IoMdHeart, IoMdMusicalNotes } from "react-icons/io";
import { ITrack, IUser } from "../../interfaces/interfaces";
import { ChartItem } from "./ChartItem";

import * as styles from "./chart.module.scss";

type ChartProps = {
  dispatch: Dispatch<any>;
  setTracks: () => void;
  likeTrack: (id: number) => void;
  unLikeTrack: (id: number) => void;
  tracks: ITrack[];
  active: ITrack;
  user: IUser;
  isAuth: boolean;
  playTrack: () => void;
  setActiveTrack: (track: ITrack) => void;
  mainUrl: string;
};

export const Chart = React.memo(
  ({
    dispatch,
    setTracks,
    likeTrack,
    unLikeTrack,
    tracks,
    active,
    user,
    isAuth,
    playTrack,
    setActiveTrack,
    mainUrl,
  }: ChartProps) => {
    useEffect(() => {
      dispatch(setTracks());
    }, [dispatch, setTracks]);

    return (
      <Row className={clsx(styles.chart, "mt-5")}>
        <Col xs={12} lg={6} className={styles.table}>
          <h2 className={styles.title}>Чарт</h2>
          {tracks?.length ? (
            <Table className=" mt-4">
              <thead>
                <tr>
                  <th className={styles.head}>#</th>
                  <th className={styles.head}>Постер</th>
                  <th className={styles.head}>Артист</th>
                  <th className={styles.head}>Трек</th>
                  <th className={styles.head}>
                    <IoMdHeart />
                  </th>
                  <th className={styles.head}>
                    <IoMdMusicalNotes />
                  </th>
                </tr>
              </thead>

              <tbody>
                {tracks
                  ?.sort((a, b) => (a.likes.length < b.likes.length ? 1 : -1))
                  .map((track, index) => (
                    <ChartItem
                      setTracks={setTracks}
                      key={track._id}
                      track={track}
                      index={index}
                      dispatch={dispatch}
                      likeTrack={likeTrack}
                      unLikeTrack={unLikeTrack}
                      active={active}
                      user={user}
                      isAuth={isAuth}
                      playTrack={playTrack}
                      setActiveTrack={setActiveTrack}
                      mainUrl={mainUrl}
                    />
                  ))}
              </tbody>
            </Table>
          ) : (
            <h4 className="text-white font-weight-bold mt-2">Загрузка...</h4>
          )}
        </Col>
        <Col xs={12} lg={6} className={styles.table}>
          <h2 className={styles.title}>Новое</h2>
          {tracks?.length ? (
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
                    Артист
                  </th>
                  <th scope="col" className={styles.head}>
                    Трек
                  </th>
                  <th scope="col" className={styles.head}>
                    <IoMdHeart />
                  </th>
                  <th className={styles.head}>
                    <IoMdMusicalNotes />
                  </th>
                </tr>
              </thead>
              <tbody>
                {tracks
                  ?.sort((a, b) => (a.date < b.date ? 1 : -1))
                  .map((track, index) => (
                    <ChartItem
                      setTracks={setTracks}
                      key={track._id}
                      track={track}
                      index={index}
                      dispatch={dispatch}
                      likeTrack={likeTrack}
                      unLikeTrack={unLikeTrack}
                      active={active}
                      user={user}
                      isAuth={isAuth}
                      playTrack={playTrack}
                      setActiveTrack={setActiveTrack}
                      mainUrl={mainUrl}
                    />
                  ))}
              </tbody>
            </Table>
          ) : (
            <h4 className="text-white font-weight-bold mt-2">Загрузка...</h4>
          )}
        </Col>
      </Row>
    );
  }
);
