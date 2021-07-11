import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { IMessage, IUser } from "../../interfaces/interfaces";
import { IoMdSend } from "react-icons/io";

// компонента чата

interface IChatProps {
  user: IUser;
  dispatch: Function;
  addMessage: Function;
  setMessages: Function;
  messages: IMessage[];
  mainUrl: string;
  io: Function;
}

export const Chat: React.FC<IChatProps> = ({
  user,
  dispatch,
  addMessage,
  setMessages,
  messages,
  mainUrl,
  io,
}) => {
  // реф сокета
  const socketRef = React.useRef<any>(null);
  // реф конца сообщений
  const messagesEndRef = React.useRef<any>(null);

  // функция прокрутки к концу сообщений
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // инициализация io и вывод сообщений
  useEffect(() => {
    socketRef.current = io(mainUrl);

    socketRef.current.on("message", () => {
      dispatch(setMessages(io(mainUrl)));
      scrollToBottom();
    });
    dispatch(setMessages(io(mainUrl)));

    return () => socketRef.current.disconnect();
  }, [dispatch, io, mainUrl, setMessages]);

  // отправка сообщений

  const onMessageSubmit = async (values: IMessage, { resetForm }: any) => {
    if (!values.message) {
      return;
    } else {
      await dispatch(addMessage(io(mainUrl), values));
      resetForm({});
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-header msg_head">
          <h2 className="text-white">Чат</h2>
        </div>
        <div className="card-body msg_card_body">
          {messages.map(({ avatar, nick, message }: IMessage, index: any) => (
            <div key={index}>
              {user.nickname === nick ? (
                <div className="d-flex justify-content-start mb-4">
                  <img
                    src={`${mainUrl}/avatar/${avatar}`}
                    className="rounded-circle user_img_msg"
                    alt="user"
                  />

                  <div className="msg_cotainer">
                    {nick}: <span className="font-weight-bold">{message}</span>
                  </div>
                </div>
              ) : (
                <div className="d-flex justify-content-end mb-4">
                  <div className="msg_cotainer_send">
                    {nick}: <span className="font-weight-bold">{message}</span>
                  </div>
                  <img
                    src={`${mainUrl}/avatar/${avatar}`}
                    className="rounded-circle user_img_msg"
                    alt="user"
                  />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="card-footer">
          <Formik
            initialValues={{
              message: "",
              nick: user.nickname,
              avatar: user.avatar,
            }}
            onSubmit={(values, actions) => {
              onMessageSubmit(values, actions);
            }}
          >
            <Form className="input-group">
              <Field
                id="message"
                type="text"
                name="message"
                className="form-control type_msg"
                placeholder="Введите сообщение..."
              />

              <button type="submit" className="btn btn-outline-danger ">
                <IoMdSend />
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};
