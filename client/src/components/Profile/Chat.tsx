import React, { Dispatch, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { IMessage, IUser } from "../../interfaces/interfaces";
import { IoMdSend } from "react-icons/io";

import * as styles from "./profile.module.scss";
import clsx from "clsx";
import { Button, FormControl } from "react-bootstrap";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";

type ChatProps = {
  user: IUser;
  dispatch: Dispatch<any>;
  addMessage: (io: any, values?: any) => void;
  setMessages: (io: any) => void;
  messages: IMessage[];
  mainUrl: string;
  io: (mainUrl: string) => Socket<DefaultEventsMap, DefaultEventsMap>;
};

export const Chat = React.memo(
  ({
    user,
    dispatch,
    addMessage,
    setMessages,
    messages,
    mainUrl,
    io,
  }: ChatProps) => {
    const socketRef = React.useRef<any>(null);

    const messagesEndRef = React.useRef<any>(null);

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
      socketRef.current = io(mainUrl);

      socketRef.current.on("message", () => {
        dispatch(setMessages(io(mainUrl)));
        scrollToBottom();
      });
      dispatch(setMessages(io(mainUrl)));

      return () => socketRef.current.disconnect();
    }, [dispatch, io, mainUrl, setMessages]);

    const onMessageSubmit = (values: IMessage, { resetForm }: any) => {
      if (!values.message) {
        return;
      } else {
        dispatch(addMessage(io(mainUrl), values));
        resetForm({});
      }
    };

    return (
      <>
        <div className={styles.chat}>
          <div className={styles.chatHeader}>
            <h2 className="text-white">Чат</h2>
          </div>
          <div className={styles.chatBody}>
            {messages.map(({ _id, avatar, nick, message }: IMessage) => (
              <div key={_id}>
                {user.nickname === nick ? (
                  <div className="d-flex justify-content-start mb-4">
                    <img
                      src={`${mainUrl}/avatar/${user.avatar}`}
                      className={clsx(styles.msgAvatar, "rounded-circle")}
                      alt="user"
                    />

                    <div className={styles.msgContainer}>
                      {nick}:<span className="font-weight-bold">{message}</span>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex justify-content-end mb-4">
                    <div className={styles.msg}>
                      {nick}:<span className="font-weight-bold">{message}</span>
                    </div>
                    <img
                      src={`${mainUrl}/avatar/${avatar}`}
                      className={clsx(styles.msgAvatar, "rounded-circle")}
                      alt="user"
                    />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className={styles.chatFooter}>
            <Formik
              initialValues={{
                _id: null,
                message: "",
                nick: user.nickname,
                avatar: user.avatar,
              }}
              onSubmit={(values, actions) => {
                onMessageSubmit(values, actions);
              }}
            >
              <Form className="d-flex">
                <Field type="text" name="message">
                  {({ field }: any) => (
                    <FormControl
                      id="message"
                      className={styles.msgInput}
                      type="text"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Введите сообщение..."
                      autoComplete="off"
                    />
                  )}
                </Field>

                <Button
                  variant="outline-danger"
                  className={styles.msgBtn}
                  type="submit"
                >
                  <IoMdSend />
                </Button>
              </Form>
            </Formik>
          </div>
        </div>
      </>
    );
  }
);
