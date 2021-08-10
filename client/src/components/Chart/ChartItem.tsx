import React, { useState } from "react";
import { ITrack, IUser } from "../../interfaces/interfaces";
import { IoIosHeart, IoIosHeartEmpty, IoIosPlay } from "react-icons/io";

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
  playTrack: Function;
  setActiveTrack: Function;
  unLikeTrack: Function;
  mainUrl: string;
  eq: string;
}

export const ChartItem: React.FC<IChartItemProps> = ({
  setTracks,
  track,
  index,
  dispatch,
  likeTrack,
  unLikeTrack,
  active,
  user,
  isAuth,
  setActiveTrack,
  playTrack,
  mainUrl,
  eq,
}) => {
  const [anime, setAnime] = useState(false);
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
    return text.length > 10 ? text.slice(0, 10).toString() + "..." : text;
  }

  const onUnLike = () => {
    setAnime(true);
    dispatch(unLikeTrack(track._id));
    dispatch(setTracks());
  };

  const onLike = () => {
    setAnime(true);
    dispatch(likeTrack(track._id));
    dispatch(setTracks());
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
          <div className="d-flex">
            {isLiked ? (
              <IoIosHeart
                className={
                  anime ? "me-1  like-icon animate-icon" : "me-1  like-icon"
                }
                onAnimationEnd={() => {
                  setAnime(false);
                }}
                onClick={onUnLike}
              />
            ) : isAuth ? (
              <IoIosHeartEmpty
                className={
                  anime ? "me-1  like-icon animate-icon" : "me-1  like-icon"
                }
                onAnimationEnd={() => {
                  setAnime(false);
                }}
                onClick={onLike}
              />
            ) : (
              <IoIosHeartEmpty className={"me-1  like-icon "} />
            )}

            {track.likes.length}
          </div>
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
