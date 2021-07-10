import React from "react";

interface IDeleteProps {
  dispatch: Function;
  deleteTrack: Function;
  setTracks: Function;
  trackId: number;
}

export const DeleteTrack: React.FC<IDeleteProps> = ({
  dispatch,
  deleteTrack,
  setTracks,
  trackId, 
}) => {
  const handleDelete = async (id: number) => {
    await dispatch(deleteTrack(id));
    await dispatch(setTracks());
  };

  return (
    <>
      <div
        className="modal fade profile__form"
        id="exampleModal2"
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
            <div className="modal-body p-4">
              <h4 className="text-white">Вы точно хотите удалить трек?</h4>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-danger "
                data-bs-dismiss="modal"
              >
                Отменить
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                data-bs-dismiss="modal"
                onClick={(e: React.SyntheticEvent<HTMLButtonElement>) => {
                  handleDelete(trackId);
                }}
              >
                Да
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
