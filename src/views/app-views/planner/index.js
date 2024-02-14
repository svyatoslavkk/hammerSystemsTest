import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card } from 'antd';

const initialItems = Array.from({ length: 5 }, (v, k) => k).map(k => ({
  id: `item-${k}`,
  content: `Square ${k + 1}`
}));

class Board extends Component {
  state = {
    items: initialItems
  };

  onDragEnd = result => {
    if (!result.destination) return;

    const newItems = Array.from(this.state.items);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);

    this.setState({ items: newItems });
  };

  render() {
    return (
      <div>
        <h1>Planner</h1>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ display: 'flex', flexWrap: 'wrap', padding: 20 }}
              >
                {this.state.items.map(({ id, content }, index) => (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          width: 100,
                          height: 100,
                          backgroundColor: 'skyblue',
                          margin: 10,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          ...provided.draggableProps.style
                        }}
                      >
                        {content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
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
