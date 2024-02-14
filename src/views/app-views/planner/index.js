import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card, Space, Button } from 'antd';

const initialItems = Array.from({ length: 5 }, (v, k) => k).map(k => ({
  id: `item-${k}`,
  imageUrl: 'https://abrakadabra.fun/uploads/posts/2022-02/1644931101_13-abrakadabra-fun-p-stol-vid-sverkhu-20.jpg',
  order: k + 1
}));

class Board extends Component {
  state = {
    items: initialItems
  };

  addItem = () => {
    const newItem = {
      id: `item-${this.state.items.length}`,
      imageUrl: 'https://abrakadabra.fun/uploads/posts/2022-02/1644931101_13-abrakadabra-fun-p-stol-vid-sverkhu-20.jpg',
      order: this.state.items.length + 1
    };
    this.setState(prevState => ({
      items: [...prevState.items, newItem]
    }));
  };

  removeItem = () => {
    if (this.state.items.length > 0) {
      this.setState(prevState => ({
        items: prevState.items.slice(0, -1)
      }));
    }
  };

  removeAllItems = () => {
    this.setState({ items: [] });
  };

  onDragEnd = result => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === 'source' && destination.droppableId === 'target') {
      const draggedItem = this.state.items[source.index];
      const newItems = Array.from(this.state.items);
      newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, draggedItem);
      this.setState({ items: newItems });
    }
  };

  render() {
    return (
      <div>
        <h1>Planner</h1>
        <Space>
          <Button type="primary" onClick={this.addItem}>Добавить элемент</Button>
          <Button type="danger" onClick={this.removeItem}>Удалить элемент</Button>
          <Button type="danger" onClick={this.removeAllItems}>Удалить все</Button>
        </Space>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div style={{ display: 'flex' }}>
            {/* <div style={{ margin: '20px' }}>
              <h2>Available Furniture</h2>
              <Droppable droppableId="source">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{ width: '150px' }}
                  >
                    {this.state.items.map(({ id, imageUrl, order }, index) => (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              width: '100px',
                              height: '100px',
                              margin: '10px',
                              backgroundImage: `url(${imageUrl})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              ...provided.draggableProps.style
                            }}
                          >
                            <span>{order}</span>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div> */}
            <div style={{ margin: '20px' }}>
              <h2>Placed Furniture</h2>
              <Droppable droppableId="target">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{ width: '400px', minHeight: '200px', border: '1px solid #ccc' }}
                  >
                    {this.state.items.map(({ id, imageUrl, order }, index) => (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided) => (
                          <>
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              position: 'relative',
                              width: '100px',
                              height: '100px',
                              margin: '10px',
                              backgroundImage: `url(${imageUrl})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              zIndex: 1,
                              ...provided.draggableProps.style
                            }}
                          >
                            <h3
                              style={{
                                color: 'orange'
                              }}
                            >
                              {order}
                            </h3>
                          </div>
                          </>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </DragDropContext>
      </div>
    );
  }
}

class Planner extends Component {

  render() {
    return (
      <div>
        <Board />
      </div>
    );
  }
}

export default Planner;
