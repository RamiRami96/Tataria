import React, { Dispatch, SyntheticEvent } from "react";
import { Button, Modal } from "react-bootstrap";

type DeleteTrackProps = {
  dispatch: Dispatch<any>;
  deleteTrack: (id: number) => void;
  setTracks: () => void;
  trackId: number;
  showDelete: boolean;
  handleCloseDelete: () => void;
};

export const DeleteTrack = ({
  dispatch,
  deleteTrack,
  setTracks,
  trackId,
  showDelete,
  handleCloseDelete,
}: DeleteTrackProps) => {
  const handleDelete = async (id: number) => {
    await dispatch(deleteTrack(id));
    await dispatch(setTracks());
  };

  return (
    <>
      <Modal show={showDelete} onHide={handleCloseDelete} centered>
        <Modal.Header closeButton />
        <Modal.Body>
          <h4 className="text-white">Вы точно хотите удалить трек?</h4>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center mt-4">
          <Button
            variant="outline-danger"
            onClick={(e: SyntheticEvent<HTMLButtonElement>) => {
              handleCloseDelete();
            }}
          >
            Отменить
          </Button>
          <Button
            variant="outline-danger"
            onClick={(e: SyntheticEvent<HTMLButtonElement>) => {
              handleDelete(trackId);
              handleCloseDelete();
            }}
          >
            Да
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
