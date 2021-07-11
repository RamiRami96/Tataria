import React, { useState } from "react";
import { IoIosCloudDownload } from "react-icons/io";
import { IUser } from "../../interfaces/interfaces";

//компонента загрузки аватара

interface IAvatar {
  mainUrl: string;
  dispatch: Function;
  uploadAvatar: Function;
  refreshUser: Function;
  user: IUser;
}

export const Avatar: React.FC<IAvatar> = ({
  mainUrl,
  dispatch,
  uploadAvatar,
  refreshUser,
  user,
}) => {
  const [avatar, setAvatar] = useState({} as File);
  const handleChange = (avatarFile: File) => {
    setAvatar(avatarFile);
  };

  // загрузка аватара
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
        <div className="avatar-upload">
          <div className="avatar-edit">
            <IoIosCloudDownload />
            <input
              type="file"
              id="imageUpload"
              accept=".png, .jpg, .jpeg"
              onChange={(e) => handleChange(e.target.files![0])}
            />
            <label htmlFor="imageUpload"></label>
          </div>

          <img
            src={
              avatar.name
                ? URL.createObjectURL(avatar)
                : `${mainUrl}/avatar/${user.avatar}`
            }
            alt="avatar"
          />
        </div>
        {avatar.name && (
          <button
            className="btn btn-outline-danger form-btn w-100 mt-2"
            onClick={uploadAvatarBtn}
          >
            Сохранить
          </button>
        )}
      </div>
    </>
  );
};
