import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Auth } from "./components/Auth/Auth";
import { Chart } from "./components/Chart/Chart";
import { Header } from "./components/Header/Header";
import { Player } from "./components/Player/Player";
import { Profile } from "./components/Profile/Profile";
import {
  authUser,
  logoutUser,
  refreshUser,
  uploadAvatar,
} from "./store/authReducer";
import {
  createTrack,
  setTracks,
  likeTrack,
  unLikeTrack,
  deleteTrack,
} from "./store/trackReducer";
import { RootState } from "./store/store";
import "./styles/style.css";
import preloader from "./preloader.gif";
/// <reference path="globals.d.ts" />

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuth, user, infoAuthMsg, authLoading } = useSelector(
    (state: RootState) => state.authReducer
  );
  const { pause, volume, active, duration, currentTime } = useSelector(
    (state: RootState) => state.playerReducer
  );

  const { tracks, infoTrackMsg, trackLoading } = useSelector(
    (state: RootState) => state.trackReducer
  );

  const messages = useSelector(
    (state: RootState) => state.messageReducer.messages
  );

  useEffect(() => {
    dispatch(authUser());
  }, [dispatch]);

  return (
    <>
      <Router>
        <div className="container">
          {authLoading ? (
            <div className="row">
              <div className="col-12 d-flex justify-content-center align-items-center preloader">
                <img src={preloader} alt="preloader" />
              </div>
            </div>
          ) : (
            <>
              <Header
                user={user}
                isAuth={isAuth}
                dispatch={dispatch}
                logoutUser={logoutUser}
              />
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => (
                    <Chart
                      dispatch={dispatch}
                      setTracks={setTracks}
                      likeTrack={likeTrack}
                      unLikeTrack={unLikeTrack}
                      active={active}
                      tracks={tracks}
                      user={user}
                      isAuth={isAuth}
                    />
                  )}
                />

                <Route
                  exact
                  path="/profile"
                  render={() =>
                    isAuth ? (
                      <Profile
                        tracks={tracks}
                        messages={messages}
                        dispatch={dispatch}
                        setTracks={setTracks}
                        createTrack={createTrack}
                        deleteTrack={deleteTrack}
                        uploadAvatar={uploadAvatar}
                        user={user}
                        infoTrackMsg={infoTrackMsg}
                        trackLoading={trackLoading}
                        refreshUser={refreshUser}
                      />
                    ) : (
                      <Auth infoAuthMsg={infoAuthMsg} />
                    )
                  }
                />
              </Switch>
              <Player
                tracks={tracks}
                pause={pause}
                volume={volume}
                active={active}
                duration={duration}
                currentTime={currentTime}
              />
            </>
          )}
        </div>
      </Router>
    </>
  );
};
