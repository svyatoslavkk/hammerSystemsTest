import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card, Space, Button, Row, Col  } from 'antd';
import circleTable from "../../../assets/img/circle-table.jpg";
import squareTable from "../../../assets/img/square-table.jpg";
import sofa from "../../../assets/img/sofa.jpg";

const initialItems = Array.from({ length: 3 }, (v, k) => k).map(k => ({
  id: `item-${k}`,
  img: circleTable,
  order: k + 1
}));

const furnitureList = [
  {
    id: 1,
    img: circleTable,
    name: "Круглый стол с 8 сиденьями",
  },
  {
    id: 2,
    img: squareTable,
    name: "Квадратный стол с 4 сиденьями",
  },
  {
    id: 3,
    img: sofa,
    name: "Диван",
  },
];

class Board extends Component {
  state = {
    items: initialItems
  };

  handleAddItem = (id, img, name) => {
    const newItem = {
      id: `item-${id}`,
      img: img,
      order: this.state.items.length + 1,
      name: name 
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
        <Row>
          <Col style={{ display: 'flex', gap: '50px', flexDirection: 'column' }}>
            <Row gutter={[16, 16]} style={{ gap: '16px' }}>
              {furnitureList.map((el) => (
                <Col key={el.id} style={{ width: '180px', height: '180px', gap: '24px' }}>
                  <div onClick={() => this.handleAddItem(el.id, el.img, el.name)}> 
                    <Card
                      hoverable
                      cover={<img alt="" src={el.img} style={{ width: '100%', height: '90%', objectFit: 'cover' }} />}
                      bodyStyle={{ padding: '8px' }} 
                    >
                      <div style={{ fontSize: '12px', overflowWrap: 'break-word' }}>{el.name}</div>
                    </Card>
                  </div>
                </Col>
              ))}
            </Row>
            <Space>
              <Button type="danger" onClick={this.removeItem}>Удалить элемент</Button>
              <Button type="danger" onClick={this.removeAllItems}>Удалить все</Button>
            </Space>
          </Col>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div style={{ display: 'flex' }}>
              <div style={{ margin: '20px' }}>
                <Droppable droppableId="target">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{ width: '100%', minHeight: '200px', border: '1px solid #ccc' }}
                    >
                      {this.state.items.map(({ id, img, order }, index) => (
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
                                backgroundImage: `url(${img})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                zIndex: 1,
                                ...provided.draggableProps.style
                              }}
                            >
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
        </Row>
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
