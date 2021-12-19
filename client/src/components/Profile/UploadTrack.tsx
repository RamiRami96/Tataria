import React, { ChangeEvent, useState } from "react";
import clsx from "clsx";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  IoMdImages,
  IoIosMusicalNotes,
  IoIosCheckmarkCircleOutline,
} from "react-icons/io";
import { IFile } from "../../interfaces/interfaces";
import { Button, FormControl, FormGroup, Modal } from "react-bootstrap";

import * as styles from "./profile.module.scss";

type IUploadProps = {
  dispatch: Function;
  createTrack: Function;
  refreshUser: Function;
  setTracks: Function;
  infoTrackMsg: string;
  trackLoading: boolean;
  showUpload: boolean;
  handleCloseUpload: Function;
};

type IValuesState = {
  title: string;
  poster: object;
  audio: object;
};

const initialValues: IValuesState = {
  title: "",
  poster: {},
  audio: {},
};

enum PosterFormats {
  jpeg = "image/jpeg",
  png = "image/png",
}

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

export const UploadTrack = ({
  dispatch,
  createTrack,
  refreshUser,
  setTracks,
  infoTrackMsg,
  trackLoading,
  showUpload,
  handleCloseUpload,
}: IUploadProps) => {
  const [fileValue, setFileValue] = useState({ poster: false, audio: false });

  const changeField = (
    event: ChangeEvent<HTMLInputElement>,
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
    handleCloseUpload();
  };

  return (
    <>
      <Modal show={showUpload} onHide={handleCloseUpload} centered>
        <Modal.Header closeButton />

        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={uploadSchema}
            onSubmit={(values, actions) => {
              handleSubmit(values, actions);
            }}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form>
                <Field name="title" required>
                  {({ field }: any) => (
                    <FormGroup className="mt-5">
                      <FormControl
                        id="title"
                        className={styles.input}
                        type="text"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Название"
                        required
                      />
                    </FormGroup>
                  )}
                </Field>
                {errors.title && touched.title ? (
                  <div className="validate-errors mt-2">{errors.title}</div>
                ) : null}

                <FormGroup className=" mt-4">
                  <input
                    id="poster"
                    className={styles.inputFile}
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
                        ? clsx(
                            styles.labelFile,
                            styles.hasFile,
                            "btn btn-tertiary"
                          )
                        : clsx(styles.labelFile, "btn btn-tertiary")
                    }
                  >
                    {fileValue.poster && !errors.poster ? (
                      <>
                        <IoIosCheckmarkCircleOutline className="me-2" />
                        <span>Постер загружен</span>
                      </>
                    ) : (
                      <>
                        <IoMdImages className="me-2" />
                        <span>Загрузить постер</span>
                      </>
                    )}
                  </label>
                  {errors.poster ? (
                    <div className="validate-errors mt-2">{errors.poster}</div>
                  ) : null}
                </FormGroup>
                <FormGroup className=" mt-4">
                  <input
                    id="audio"
                    className={styles.inputFile}
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
                        ? clsx(
                            styles.labelFile,
                            styles.hasFile,
                            "btn btn-tertiary"
                          )
                        : clsx(styles.labelFile, "btn btn-tertiary")
                    }
                  >
                    {fileValue.audio && !errors.audio ? (
                      <>
                        <IoIosCheckmarkCircleOutline className="me-2" />
                        <span>Трек загружен</span>
                      </>
                    ) : (
                      <>
                        <IoIosMusicalNotes className="me-2" />
                        <span>Загрузить трек </span>
                      </>
                    )}
                  </label>
                  {errors.audio ? (
                    <div className="validate-errors mt-2">{errors.audio}</div>
                  ) : null}
                </FormGroup>

                {infoTrackMsg ? (
                  <div className="validate-errors mt-2">{infoTrackMsg}</div>
                ) : null}
                {trackLoading ? (
                  <Button
                    disabled
                    className={clsx(styles.profileBtn, "w-100 mt-5")}
                  >
                    Подождите...
                  </Button>
                ) : (
                  <Button
                    variant="outline-danger"
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
                    className={clsx(styles.profileBtn, "w-100 mt-5")}
                  >
                    Загрузить
                  </Button>
                )}
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};
