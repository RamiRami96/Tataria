import React, { Dispatch, useState } from "react";
import clsx from "clsx";
import { ITrack, IUser } from "../../interfaces/interfaces";
import { IoIosHeart, IoIosHeartEmpty, IoIosPlay } from "react-icons/io";
import eq from "./images/eq.gif";

import * as styles from "./chart.module.scss";
import { sliceText } from "../../helpers/sliceText";

type ChartItemProps = {
  setTracks: () => void;
  track: ITrack;
  index: number;
  dispatch: Dispatch<any>;
  likeTrack: Function;
  active?: ITrack;
  user: IUser;
  isAuth: boolean;
  playTrack: () => void;
  setActiveTrack: (track: ITrack) => void;
  unLikeTrack: Function;
  mainUrl: string;
};

export const ChartItem = ({
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
}: ChartItemProps) => {
  const [anime, setAnime] = useState(false);

  let isLiked = track.likes.some((like) => like === user.id);

  const play = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(setActiveTrack(track));
    dispatch(playTrack());
  };

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
        <th>{index + 1}</th>
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
                  anime
                    ? clsx(styles.likeIcon, styles.animateIcon, "me-1")
                    : clsx(styles.likeIcon, "me-1")
                }
                onAnimationEnd={() => {
                  setAnime(false);
                }}
                onClick={onUnLike}
              />
            ) : isAuth ? (
              <IoIosHeartEmpty
                className={
                  anime
                    ? clsx(styles.likeIcon, styles.animateIcon, "me-1")
                    : clsx(styles.likeIcon, "me-1")
                }
                onAnimationEnd={() => {
                  setAnime(false);
                }}
                onClick={onLike}
              />
            ) : (
              <IoIosHeartEmpty className={clsx(styles.likeIcon, "me-1")} />
            )}

            {track.likes.length}
          </div>
        </td>
        <td>
          {active === track ? (
            <img src={eq} className={styles.eq} alt="eq" />
          ) : (
            <IoIosPlay className={styles.playIcon} onClick={play} />
          )}
        </td>
      </tr>
    </>
  );
};
