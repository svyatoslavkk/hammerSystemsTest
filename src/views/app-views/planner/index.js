import React, { Component } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Button, Space } from 'antd';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      objects: [],
    };
    this.handleDrop = this.handleDrop.bind(this);
  };

  moveObject = (id, left, top) => {
    const { objects } = this.state;
    const updatedObjects = objects.map(obj =>
      obj.id === id ? { ...obj, left, top } : obj
    );
    this.setState({ objects: updatedObjects });
  };

  handleDrop(event) {
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer.getData('object'));
    const delta = this.getDelta(event);
    const { objects } = this.state;
    const { left, top } = delta;
    this.moveObject(data.id, left, top);
  };

  getDelta = event => {
    const currentX = event.clientX;
    const currentY = event.clientY;
    const rect = event.target.getBoundingClientRect();
    const left = currentX - rect.left;
    const top = currentY - rect.top;
    return { left, top };
  };

  allowDrop = event => {
    event.preventDefault();
  };

  renderObjects = () => {
    return this.state.objects.map(obj => (
      <div
        key={obj.id}
        style={{
          position: 'absolute',
          left: obj.left,
          top: obj.top,
          width: '50px',
          height: '50px',
          backgroundColor: 'blue',
        }}
      />
    ));
  };

  render() {

    return (
      <div>
        <Space>
          <Button type="primary">Сохранить</Button>
          <Button type="danger">Удалить все</Button>
          <Button type="default">Удалить элемент</Button>
        </Space>
        <div
          onDrop={this.handleDrop}
          onDragOver={this.allowDrop}
          style={{
            position: 'relative',
            width: '500px',
            height: '500px',
            backgroundColor: 'lightgray'
          }}
        >
          {this.renderObjects()}
        </div>
      </div>
    );
  }
}

class ObjectBoard extends React.Component {
  handleDragStart = (event, id) => {
    event.dataTransfer.setData('object', JSON.stringify({ id }));
  };

  render() {
    return (
      <div
        draggable
        onDragStart={e => this.handleDragStart(e, 'uniqueId')}
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: 'green',
          margin: '20px'
        }}
      />
    );
  }
}

class Planner extends Component {
  render() {
    return (
      <div>
        <ObjectBoard />
        <Board />
      </div>
    )
  }
}

export default Planner;
