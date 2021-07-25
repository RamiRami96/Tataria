import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  IoMdImages,
  IoIosMusicalNotes,
  IoIosCheckmarkCircleOutline,
} from "react-icons/io";
import { IFile } from "../../interfaces/interfaces";

// компонента загрузки трека

interface IUploadProps {
  dispatch: Function;
  createTrack: Function;
  refreshUser: Function;
  setTracks: Function;
  infoTrackMsg: string;
  trackLoading: boolean;
}

interface IValuesState {
  title: string;
  poster: object;
  audio: object;
}

enum PosterFormats {
  jpeg = "image/jpeg",
  png = "image/png",
}

// функция проверка на тип изображения

function checkIfPosterIsCorrectType(file?: IFile): boolean {
  if (file?.type === undefined) {
    return true;
  } else {
    if (
      file!.type.includes(PosterFormats.jpeg) ||
      file!.type.includes(PosterFormats.png)
    ) {
      return true;
    } else {
      return false;
    }
  }
}

// функция проверка на тип аудио

function checkIfAudioIsCorrectType(file?: IFile): boolean {
  if (file?.type === undefined) {
    return true;
  } else {
    if (file!.type.includes("audio/mpeg")) {
      return true;
    } else {
      return false;
    }
  }
}

// валидация загрузки трека

const uploadSchema = Yup.object().shape({
  title: Yup.string().required("Поле обязательно!"),
  poster: Yup.mixed()
    .required("Поле обязательно!")
    .test(
      "poster",
      "Неверный формат! Загружайте в формате jpeg и png",
      checkIfPosterIsCorrectType
    ),
  audio: Yup.mixed()
    .required("Поле обязательно!")
    .test(
      "audio",
      "Неверный формат! Загружайте в формате mp3",
      checkIfAudioIsCorrectType
    ),
});

export const UploadTrack: React.FC<IUploadProps> = ({
  dispatch,
  createTrack,
  refreshUser,
  setTracks,
  infoTrackMsg,
  trackLoading,
}) => {
  const [fileValue, setFileValue] = useState({ poster: false, audio: false });

  // функция изменяющее состояние постера или аудио в зависимости от выбранного поля
  const changeField = (
    event: React.ChangeEvent<HTMLInputElement>,
    changeFunc: Function,
    field: string
  ) => {
    if (event.currentTarget.value) {
      if (field === "poster") {
        setFileValue({ ...fileValue, poster: true });
      } else if (field === "audio") {
        setFileValue({ ...fileValue, audio: true });
      }
    }
    changeFunc(field, event.currentTarget.files![0]);
  };

  // загрузка трека с последующим обновлением состояния треков

  const handleSubmit = async (values: any, { resetForm }: any) => {
    let formData = new FormData();
    formData.append("title", values.title);
    formData.append("poster", values.poster as Blob);
    formData.append("audio", values.audio as Blob);
    await dispatch(createTrack(formData));
    await dispatch(refreshUser());
    await dispatch(setTracks());
    setFileValue({ ...fileValue, poster: false, audio: false });
    resetForm({});
  };

  const initialValues: IValuesState = {
    title: "",
    poster: {},
    audio: {},
  };

  return (
    <>
      <div
        className="modal fade profile__form"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body ">
              <Formik
                initialValues={initialValues}
                validationSchema={uploadSchema}
                onSubmit={(values, actions) => {
                  handleSubmit(values, actions);
                }}
              >
                {({ errors, touched, setFieldValue }) => (
                  <Form>
                    <div className="group ">
                      <Field
                        id="title"
                        type="text"
                        name="title"
                        className="input-text"
                        required
                      />
                      <span className="highlight"></span>
                      <span className="bar"></span>
                      <label>Название</label>
                      {errors.title && touched.title ? (
                        <div className="validate-errors mt-2">
                          {errors.title}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group mt-4">
                      <input
                        id="poster"
                        className="input-file"
                        type="file"
                        name="poster"
                        onChange={(event) => {
                          changeField(event, setFieldValue, "poster");
                        }}
                        accept="image/jpeg,image/png,image/"
                        required
                      />
                      <label
                        htmlFor="poster"
                        className={
                          fileValue.poster && !errors.poster
                            ? "btn btn-tertiary js-labelFile has-file"
                            : "btn btn-tertiary js-labelFile"
                        }
                      >
                        {fileValue.poster && !errors.poster ? (
                          <>
                            <IoIosCheckmarkCircleOutline className="me-2" />
                            <span className="js-fileName">Постер загружен</span>
                          </>
                        ) : (
                          <>
                            <IoMdImages className="me-2" />
                            <span className="js-fileName">
                              Загрузить постер
                            </span>
                          </>
                        )}
                      </label>
                      {errors.poster ? (
                        <div className="validate-errors mt-2">
                          {errors.poster}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group mt-4">
                      <input
                        id="audio"
                        className="input-file"
                        type="file"
                        name="audio"
                        onChange={(event) => {
                          changeField(event, setFieldValue, "audio");
                        }}
                        accept=".mp3"
                        required
                      />
                      <label
                        htmlFor="audio"
                        className={
                          fileValue.audio && !errors.audio
                            ? "btn btn-tertiary js-labelFile has-file"
                            : "btn btn-tertiary js-labelFile"
                        }
                      >
                        {fileValue.audio && !errors.audio ? (
                          <>
                            <IoIosCheckmarkCircleOutline className="me-2" />
                            <span className="js-fileName">Трек загружен</span>
                          </>
                        ) : (
                          <>
                            <IoIosMusicalNotes className="me-2" />
                            <span className="js-fileName">Загрузить трек </span>
                          </>
                        )}
                      </label>
                      {errors.audio ? (
                        <div className="validate-errors mt-2">
                          {errors.audio}
                        </div>
                      ) : null}
                    </div>

                    {infoTrackMsg ? (
                      <div className="validate-errors mt-2">{infoTrackMsg}</div>
                    ) : null}
                    {trackLoading ? (
                      <button
                        disabled
                        type="submit"
                        className="btn btn-outline-danger form-btn w-100 mt-5"
                      >
                        Подождите...
                      </button>
                    ) : (
                      <button
                        disabled={
                          errors.title
                            ? true
                            : false && errors.poster
                            ? true
                            : false && errors.audio
                            ? true
                            : false && infoTrackMsg.length > 0
                            ? true
                            : false
                        }
                        type="submit"
                        className="btn btn-outline-danger form-btn w-100 mt-5"
                      >
                        Загрузить
                      </button>
                    )}
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
