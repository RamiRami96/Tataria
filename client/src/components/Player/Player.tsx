import React, { ChangeEvent, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import clsx from "clsx";
import {
  IoMdSkipBackward,
  IoIosPlayCircle,
  IoIosPause,
  IoMdSkipForward,
  IoMdVolumeHigh,
} from "react-icons/io";
import { useDispatch } from "react-redux";
import { ITrack } from "../../interfaces/interfaces";
import {
  pauseTrack,
  playTrack,
  setActiveTrack,
  setCurrentTime,
  setDuration,
  setVolume,
} from "../../store/playerReducer";

import * as styles from "./player.module.scss";
import { sliceText } from "../../helpers/sliceText";

//компонента проигрывателя

type IPlayerProps = {
  tracks: ITrack[];
  pause: boolean;
  volume: number;
  active: ITrack;
  duration: number;
  currentTime: number;
  mainUrl: string;
};

let audio: any;

export const Player = ({
  tracks,
  pause,
  volume,
  active,
  duration,
  currentTime,
  mainUrl,
}: IPlayerProps) => {
  let candidateTrack = tracks.findIndex((track) => track._id === active?._id);

  const dispatch = useDispatch();

  const onNextAudio = () => {
    if (candidateTrack - 1 < 0) {
      dispatch(setActiveTrack(tracks[tracks.length - 1]));
    } else {
      dispatch(setActiveTrack(tracks[candidateTrack - 1]));
    }
  };

  const onPrevAudio = () => {
    if (candidateTrack < tracks.length - 1) {
      dispatch(setActiveTrack(tracks[candidateTrack + 1]));
    } else {
      dispatch(setActiveTrack(tracks[0]));
    }
  };

  const setAudio = () => {
    if (active) {
      audio.src = `${mainUrl}/audio/${active.audio}`;
      audio.volume = volume / 100;

      audio.onended = () => {
        onNextAudio();
      };

      audio.onloadedmetadata = () => {
        dispatch(setDuration(Math.ceil(audio.duration)));
      };
      audio.ontimeupdate = () => {
        dispatch(setCurrentTime(Math.ceil(audio.currentTime)));
      };
    }
  };

  const onPlay = () => {
    dispatch(playTrack());
    audio.play();
  };

  const onPause = () => {
    dispatch(pauseTrack());
    audio.pause();
  };

  const changeVolume = (e: ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(e.target.value) / 100;
    dispatch(setVolume(Number(e.target.value)));
  };

  const trackbarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value);
    dispatch(setCurrentTime(Number(e.target.value)));
  };

  function convertTrackTime(time: number): string {
    let minutes: any = "0" + Math.floor(time / 60);
    let seconds: any = "0" + Math.floor(time - minutes * 60);
    let dur: string | number = minutes.substr(-2) + ":" + seconds.substr(-2);
    return dur;
  }

  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    } else {
      setAudio();
      onPlay();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    active && (
      <>
        <Row
          className={clsx(
            styles.player,
            "fixed-bottom d-flex justify-content-center py-2 px-3 px-lg-5"
          )}
        >
          <Col xs={4} md={3} className="d-flex align-items-center">
            <img
              className={clsx(styles.trackImg, "d-none d-lg-flex")}
              src={`${mainUrl}/image/${active.poster}`}
              alt="poster"
            />
            <div className="d-flex flex-column justify-content-center ms-0 ms-lg-4">
              <p className={styles.trackArtist}>{sliceText(active.artist)}</p>
              <h6 className={styles.trackTitle}>{sliceText(active.title)}</h6>
            </div>
          </Col>
          <Col
            xs={4}
            md={6}
            className="d-flex justify-content-center align-items-center"
          >
            <IoMdSkipBackward
              className={styles.backward}
              onClick={onPrevAudio}
            />
            <div>
              {pause ? (
                <IoIosPlayCircle
                  className={clsx(styles.play, "mx-2")}
                  onClick={onPlay}
                />
              ) : (
                <IoIosPause
                  className={clsx(styles.play, "mx-2")}
                  onClick={onPause}
                />
              )}
            </div>
            <IoMdSkipForward className={styles.forward} onClick={onNextAudio} />
          </Col>
          <Col
            xs={4}
            md={3}
            className={clsx(
              styles.volume,
              "d-flex justify-content-end align-items-center"
            )}
          >
            <IoMdVolumeHigh className={clsx(styles.volume, "me-2")} />
            <Form.Range
              className={styles.rangeTrack}
              max={100}
              min={0}
              value={volume}
              onChange={changeVolume}
            />
          </Col>

          <Col
            xs={12}
            md={6}
            className="d-flex justify-content-center align-items-center"
          >
            <span className="text-white">{convertTrackTime(currentTime)}</span>
            <Form.Range
              className={clsx(styles.rangeTrack, "mx-2")}
              max={duration}
              min={0}
              value={currentTime}
              onChange={trackbarChange}
            />

            <span className="text-white"> {convertTrackTime(duration)}</span>
          </Col>
        </Row>
      </>
    )
  );
};
