import clsx from "clsx";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { IoIosCloudDownload } from "react-icons/io";
import { IUser } from "../../interfaces/interfaces";

import * as styles from "./profile.module.scss";

type AvatarProps = {
  mainUrl: string;
  dispatch: Function;
  uploadAvatar: Function;
  refreshUser: Function;
  user: IUser;
};

export const Avatar = ({
  mainUrl,
  dispatch,
  uploadAvatar,
  refreshUser,
  user,
}: AvatarProps) => {
  const [avatar, setAvatar] = useState({} as File);
  const handleChange = (avatarFile: File) => {
    setAvatar(avatarFile);
  };

  const uploadAvatarBtn = async () => {
    let formData = new FormData();
    formData.append("avatar", avatar as Blob);
    await uploadAvatar(formData);
    setAvatar({} as File);
    await dispatch(refreshUser());
  };

  return (
    <>
      <div className="d-flex flex-column">
        <div className={styles.avatarUpload}>
          <div className={styles.avatarEdit}>
            <IoIosCloudDownload className={styles.avatarIcon} />
            <input
              className={styles.avatarInput}
              type="file"
              id="imageUpload"
              accept=".png, .jpg, .jpeg"
              onChange={(e) => handleChange(e.target.files![0])}
            />
            <label htmlFor="imageUpload"></label>
          </div>
          <img
            className={styles.avatar}
            src={
              avatar.name
                ? URL.createObjectURL(avatar)
                : `${mainUrl}/avatar/${user.avatar}`
            }
            alt="avatar"
          />
        </div>
        {avatar.name && (
          <Button
            className={clsx(styles.profileBtn, "w-100 mt-2")}
            variant="danger"
            onClick={uploadAvatarBtn}
          >
            Сохранить
          </Button>
        )}
      </div>
    </>
  );
};
