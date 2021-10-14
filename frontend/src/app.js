import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import * as Icon from 'react-bootstrap-icons';
import './style.scss';

export default function App() {

  document.title = "Todo List";

  let [todo, setTodo] = useState({});
  let [todos, setTodos] = useState([]);

  // GET DATA
  const getData = () => {
    axios.get('/api')
      .then((res) => {
        const data = res.data;
        setTodos(data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => { getData(); }, []);
  console.log(window.location);

  // SEND DATA TO THE SERVER
  const handleSubmit = () => {
    axios({
      url: '/api/save',
      method: 'POST',
      data: todo
    })
      .then(() => {
        console.log('Data has been sent to the server!');
      })
      .catch((err) => {
        console.log(err);
      });

      window.location.href.replace("/");
  };

  return (
    <div className="container">
      <div className="main-wrapper p-5 rounded w-100">
        <h3 className="text-center fw-bold mb-4">TODO APP</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <input
              type="text"
              name="title"
              placeholder="Write here..."
              className="form-control"
              onChange={(e) => { setTodo({ task: e.target.value }); }}
              required
            />
            <button className="btn-dark rounded-end px-3 py-2" type="submit">Add</button>
          </div>
        </form>
        {todos.map((item, index) => {
          return (
            <div
              key={index}
              className="mb-3 d-flex align-items-center justify-content-between py-2 mx-auto task"
            >
              <div
                className="d-flex align-items-center task-text w-100"
                onClick={() => {
                  axios({
                    url: '/api/update',
                    method: 'PUT',
                    data: {
                      isDone: !item.isDone,
                      id: item._id
                    }
                  }).then(() => {
                    getData();
                  });
                }}
              >
                <i className="icon me-2 d-flex fs-5">
                  {item.isDone ? <Icon.CheckCircleFill color="yellowgreen" /> : <Icon.CheckCircle />}
                </i>
                <i>
                  {item.isDone === true ? <s><b>{item.task}</b></s> : item.task}
                </i>
              </div>
              <i
                className="delete-icon d-flex fs-5"
                onClick={() => {
                  axios({
                    url: '/api/delete',
                    method: 'DELETE',
                    data: {
                      id: item._id
                    }
                  });
                  getData();
                }}
              >
                <Icon.XCircleFill color="red" />
              </i>
            </div>
          );
        })}
      </div>
    </div>
  );
};