import React from "react";
import { IoMdClose } from "react-icons/io";
import { ITrack } from "../../interfaces/interfaces";

interface MyTrackProps {
  track: ITrack;
  index: number;
  mainUrl: string;
  setTrackId: any;
}

export const MyTrack: React.FC<MyTrackProps> = ({
  index,
  track,
  mainUrl,
  setTrackId,
}) => {
  return (
    <>
      <tr>
        <th scope="row">{index + 1}</th>
        <td>
          <img src={`${mainUrl}/image/${track.poster}`} alt="img" />
        </td>

        <td>{track.title}</td>
        <td>
          <> {track.likes.length}</>
        </td>
        <td>
          <>
            <IoMdClose
              className="me-1 pb-1 like-icon delete-icon"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal2"
              data-id={track._id}
              onClick={() => {
                setTrackId(track._id);
              }}
            />
          </>
        </td>
      </tr>
    </>
  );
};
