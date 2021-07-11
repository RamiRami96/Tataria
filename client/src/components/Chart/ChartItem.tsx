import React, { useState } from "react";
import { ITrack, IUser } from "../../interfaces/interfaces";
import { IoIosHeart, IoIosHeartEmpty, IoIosPlay } from "react-icons/io";
import { mainUrl } from "../../api/api";
import { playTrack, setActiveTrack } from "../../store/playerReducer";
import eq from "./eq.gif";
import { unLikeTrack } from "../../store/trackReducer";
import { useHistory } from "react-router-dom";

// компонента трека из чарта

interface IChartItemProps {
  setTracks: Function;
  track: ITrack;
  index: number;
  dispatch: Function;
  likeTrack: Function;
  active?: ITrack;
  user: IUser;
  isAuth: boolean;
}

export const ChartItem: React.FC<IChartItemProps> = ({
  setTracks,
  track,
  index,
  dispatch,
  likeTrack,
  active,
  user,
  isAuth,
}) => {
  const [anime, setAnime] = useState(false);

  let history = useHistory();

  //проверка был ли поставлен лайк пользователем

  let isLiked = track.likes.some((like) => like === user.id);

  // проигрывание трека

  const play = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(setActiveTrack(track));
    dispatch(playTrack());
  };

  // функция при которой после 10-ти букв в предложении ставится троеточие

  function sliceText(text: string): string {
    let sliced = text.slice(0, 10);
    if (sliced.length < text.length) {
      sliced += "...";
    }
    return sliced;
  }

  // редирект на компоненту логинизации (если пользователь не зарегистрирован, profile возвращает компоненту логинизации)

  const doRedirect = () => {
    history.push("/profile");
  };

  return (
    <>
      <tr>
        <th scope="row">{index + 1}</th>
        <td>
          <img src={`${mainUrl}/image/${track.poster}`} alt="poster" />
        </td>
        <td>{sliceText(track.artist)}</td>
        <td>{sliceText(track.title)}</td>
        <td>
          <>
            {isLiked ? (
              <IoIosHeart
                className={
                  anime
                    ? "me-1 pb-1 like-icon animate-icon"
                    : "me-1 pb-1 like-icon"
                }
                onAnimationEnd={() => {
                  setAnime(false);
                }}
                onClick={() => {
                  setAnime(true);
                  dispatch(unLikeTrack(track._id));
                  dispatch(setTracks());
                }}
              />
            ) : isAuth ? (
              <IoIosHeartEmpty
                className={
                  anime
                    ? "me-1 pb-1 like-icon animate-icon"
                    : "me-1 pb-1 like-icon"
                }
                onAnimationEnd={() => {
                  setAnime(false);
                }}
                onClick={() => {
                  setAnime(true);
                  dispatch(likeTrack(track._id));
                  dispatch(setTracks());
                }}
              />
            ) : (
              <IoIosHeartEmpty
                className={"me-1 pb-1 like-icon "}
                onClick={doRedirect}
              />
            )}

            {track.likes.length}
          </>
        </td>
        <td>
          {active === track ? (
            <img src={eq} className="eq" alt="eq" />
          ) : (
            <IoIosPlay className="play-icon" onClick={play} />
          )}
        </td>
      </tr>
    </>
  );
};
