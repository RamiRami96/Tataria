import clsx from "clsx";
import React from "react";
import { IoMdClose } from "react-icons/io";
import { ITrack } from "../../interfaces/interfaces";

import * as styles from "./profile.module.scss";

type MyTrackProps = {
  track: ITrack;
  index: number;
  mainUrl: string;
  setTrackId: any;
  handleShowDelete: () => void;
};

export const MyTrack = ({
  index,
  track,
  mainUrl,
  setTrackId,
  handleShowDelete,
}: MyTrackProps) => {
  return (
    <>
      <tr>
        <th>{index + 1}</th>
        <td>
          <img src={`${mainUrl}/image/${track.poster}`} alt="img" />
        </td>
        <td>{track.title}</td>
        <td>{track.likes.length}</td>
        <td>
          <IoMdClose
            className={clsx(styles.deleteIcon, "me-1 pb-1 ")}
            data-id={track._id}
            onClick={() => {
              setTrackId(track._id);
              handleShowDelete();
            }}
          />
        </td>
      </tr>
    </>
  );
};
