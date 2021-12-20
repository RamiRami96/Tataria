import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
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
import "./styles/style.scss";
import preloader from "./images/preloader.gif";
import { playTrack, setActiveTrack } from "./store/playerReducer";
import { mainUrl } from "./api/api";

import "bootstrap/dist/css/bootstrap.min.css";

/// <reference path="globals.d.ts" />

export const App: React.FC = () => {
  const dispatch = useDispatch();

  // селекторы приложения
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

  // инициализация юзера

  useEffect(() => {
    dispatch(authUser());
  }, [dispatch]);

  return (
    <>
      <Router>
        <Container>
          <Header
            user={user}
            isAuth={isAuth}
            dispatch={dispatch}
            logoutUser={logoutUser}
          />
          {authLoading ? (
            <Row>
              <Col
                xs={12}
                className=" d-flex justify-content-center align-items-center preloader"
              >
                <img src={preloader} alt="preloader" />
              </Col>
            </Row>
          ) : isAuth ? (
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
                    playTrack={playTrack}
                    setActiveTrack={setActiveTrack}
                    mainUrl={mainUrl}
                  />
                )}
              />

              <Route
                exact
                path="/profile"
                render={() => (
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
                    mainUrl={mainUrl}
                  />
                )}
              />

              <Redirect to="/" />
            </Switch>
          ) : (
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
                    playTrack={playTrack}
                    setActiveTrack={setActiveTrack}
                    mainUrl={mainUrl}
                  />
                )}
              />
              <Route
                exact
                path="/auth"
                render={() => (
                  <Auth dispatch={dispatch} infoAuthMsg={infoAuthMsg} />
                )}
              />

              <Redirect to="/auth" />

              <Player
                tracks={tracks}
                pause={pause}
                volume={volume}
                active={active}
                duration={duration}
                currentTime={currentTime}
                mainUrl={mainUrl}
              />
            </Switch>
          )}
        </Container>
      </Router>
    </>
  );
};
