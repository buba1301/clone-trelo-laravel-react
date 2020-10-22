import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const slice = createSlice({
  name: 'deleteModal',
  initialState: {
    showModal: false,
    type: '',
    id: '',
  },
  reducers: {
    showDeleteModal: (state, { payload: { type, id, showModal } }) => ({
      ...state, type, id, showModal,
    }),
    hideDeleteModal: (state, { payload }) => ({
      ...state, showModal: false, type: '', id: '',
    }),

  },
});

const modalActions = slice.actions;
const deleteModal = slice.reducer;

export { modalActions, deleteModal };
