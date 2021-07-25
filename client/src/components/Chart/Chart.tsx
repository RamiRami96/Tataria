import React from "react";
import { useEffect } from "react";
import { IoMdHeart, IoMdMusicalNotes } from "react-icons/io";
import { ITrack, IUser } from "../../interfaces/interfaces";
import { ChartItem } from "./ChartItem";

// компонента чарта

interface IChartProps {
  dispatch: Function;
  setTracks: Function;
  likeTrack: Function;
  unLikeTrack: Function;
  tracks: ITrack[];
  active: ITrack;
  user: IUser;
  isAuth: boolean;
}

export const Chart: React.FC<IChartProps> = ({
  dispatch,
  setTracks,
  likeTrack,
  tracks,
  active,
  user,
  isAuth,
}) => {
  useEffect(() => {
    dispatch(setTracks());
  }, [dispatch, setTracks]);

  return (
    <div className="row mt-5 chart">
      <div className="col-12 col-lg-6 left-side">
        <h1>Чарт</h1>

        {tracks?.length ? (
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
                  Артист
                </th>
                <th scope="col" className="head">
                  Трек
                </th>
                <th scope="col" className="head">
                  <IoMdHeart />
                </th>
                <th scope="col" className="head">
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
                    active={active}
                    user={user}
                    isAuth={isAuth}
                  />
                ))}
            </tbody>
          </table>
        ) : (
          <h4 className="text-white font-weight-bold mt-2">Загрузка...</h4>
        )}
      </div>
      <div className="col-12 col-lg-6 right-side">
        <h1>Новое</h1>
        {tracks?.length ? (
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
                  Артист
                </th>
                <th scope="col" className="head">
                  Трек
                </th>
                <th scope="col" className="head">
                  <IoMdHeart />
                </th>
                <th scope="col" className="head">
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
                    active={active}
                    user={user}
                    isAuth={isAuth}
                  />
                ))}
            </tbody>
          </table>
        ) : (
          <h4 className="text-white font-weight-bold mt-2">Загрузка...</h4>
        )}
      </div>
    </div>
  );
};
