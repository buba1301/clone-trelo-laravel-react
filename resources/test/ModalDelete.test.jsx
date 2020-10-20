/* eslint-disable max-len */
import React from 'react';
import { shallow, mount } from 'enzyme';
import ModalDelete from '../js/components/ModalDelete.jsx';

describe('Render DeleteModal', () => {
  const mockClose = jest.fn();
  const mockDelete = jest.fn();

  const props = {
    showDeleteModal: true,
    type: 'board',
    handleClose: mockClose,
    handleDelete: mockDelete,
  };

  const DeleteModalComponent = shallow(<ModalDelete { ...props } />);

  it('render correctly component', () => {
    expect(DeleteModalComponent).toMatchSnapshot();
  });

  it('render', () => {
    expect(DeleteModalComponent.find('Modal')).toHaveLength(1);
  });

  describe('render correct props', () => {
    const DeleteModalComponentForProps = mount(<ModalDelete { ...props } />); /// / почему пропсы есть только через mount
    it('check prop type', () => {
      expect(DeleteModalComponentForProps.props().showDeleteModal).toBeBoolean();
      expect(DeleteModalComponentForProps.props().type).toBeString();
      expect(DeleteModalComponentForProps.props().handleClose).toBeFunction();
      expect(DeleteModalComponentForProps.props().handleDelete).toBeFunction();
    });

    it('check prop value', () => {
      expect(DeleteModalComponentForProps.props().showDeleteModal).toBeTrue();
      expect(DeleteModalComponentForProps.props().type).toEqual('board');
    });
  });

  describe('when click close button', () => {
    it('call the props.handleClose', () => {
      DeleteModalComponent.find('#close').simulate('click', {
        preventDefault: () => {},
      });
      expect(mockClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('when click delete button', () => {
    it('call the props.handleDelete', () => {
      DeleteModalComponent.find('#delete').simulate('click', {
        preventDefault: () => {},
      });
      expect(mockDelete).toHaveBeenCalledTimes(1);
    });
  });
});
