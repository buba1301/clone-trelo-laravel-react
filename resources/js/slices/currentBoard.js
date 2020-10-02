import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';
import echo from '../bootstrap';

const slice = createSlice({
  name: 'currentBoard',
  initialState: {
    channel: '',
    fetching: true,
  },
  reducers: {
    addBoard: (state, { payload: { board } }) => ({ ...state, board }),
  },
});

const currentBoardActions = slice.actions;
const currentBoard = slice.reducer;

const connectToChannel = (currentBoardId, authToken) => async (dispatch) => {
  const url = routes.boardPathShow(currentBoardId);
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  console.log(res.data);
  const { board } = res.data;

  dispatch(currentBoardActions.addBoard({ board }));
  /* echo.private(`board.${currentBoardId}`)
    .listen('BoardCreated', (e) => {
      console.log(e.board);
      dispatch(currentBoardActions.addBoard(e.board));
    }); */

  echo.join(`board.${currentBoardId}`)
    .here((data) => {
      console.log(data);
    });
  // console.log(channel);
  // const fixTokenChannel = _.set(channel, 'options.auth.headers.X-CSRF-TOKEN', csrfToken);
  // console.log(fixTokenChannel);
  /* channel
    .here((boards) => {
      //
    })
    .joining((board) => {
      console.log(board);
    }); */
};

export { currentBoardActions, currentBoard, connectToChannel };
