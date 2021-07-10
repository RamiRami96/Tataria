import React, { useEffect } from "react";
import {
  IoMdSkipBackward,
  IoIosPlayCircle,
  IoIosPause,
  IoMdSkipForward,
  IoMdVolumeHigh,
} from "react-icons/io";
import { useDispatch } from "react-redux";
import { mainUrl } from "../../api/api";
import { ITrack } from "../../interfaces/interfaces";
import {
  pauseTrack,
  playTrack,
  setActiveTrack,
  setCurrentTime,
  setDuration,
  setVolume,
} from "../../store/playerReducer";

interface IPlayerProps {
  tracks: ITrack[];
  pause: boolean;
  volume: number;
  active: ITrack;
  duration: number;
  currentTime: number;
}

let audio: any;

export const Player: React.FC<IPlayerProps> = ({
  tracks,
  pause,
  volume,
  active,
  duration,
  currentTime,
}) => {
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

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  }, [active]);

  return (
    active && (
      <>
        <div className="row fixed-bottom d-flex justify-content-center player px-3 px-lg-5">
          <div className=" player__track col-3 d-flex align-items-center">
            <img
              className="d-none d-lg-flex"
              src={`${mainUrl}/image/${active.poster}`}
              alt="poster"
            />
            <div className="d-flex flex-column justify-content-center ms-0 ms-lg-4">
              <p>{active.artist}</p>
              <h6>{active.title}</h6>
            </div>
          </div>
          <div className="player__controlls col-6 d-flex justify-content-center align-items-center">
            <IoMdSkipBackward className="backward" onClick={onPrevAudio} />
            <div>
              {pause ? (
                <IoIosPlayCircle className="play mx-2" onClick={onPlay} />
              ) : (
                <IoIosPause className="play mx-2" onClick={onPause} />
              )}
            </div>
            <IoMdSkipForward className="forward" onClick={onNextAudio} />
          </div>
          <div className="player__volume col-3 d-flex justify-content-end align-items-center">
            <IoMdVolumeHigh className="volume me-2" />
            <input
              type="range"
              className="form-range"
              max={100}
              min={0}
              value={volume}
              onChange={changeVolume}
            />
          </div>

          <div className="col-12 col-md-6 player__trackbar d-flex justify-content-center align-items-center">
            <span className="text-white">{convertTrackTime(currentTime)}</span>
            <input
              type="range"
              className="form-range mx-2"
              max={duration}
              min={0}
              value={currentTime}
              onChange={trackbarChange}
            />
            <span className="text-white"> {convertTrackTime(duration)}</span>
          </div>
        </div>
      </>
    )
  );
};
