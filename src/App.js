import { Component } from "react";
import PhoneForm from "./components/PhoneForm";
import PhoneInfoList from "./components/PhoneInfoList";

class App extends Component {
  id = 2;
  state = {
    information: [
      {
        id: 0,
        name: '이승호',
        phone: '010-9327-7229'
      },
      {
        id: 1,
        name: '김규리',
        phone: '010-7483-5575'
      }
    ],
    keyword: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({ id: this.id++, ...data })
    });
    console.log(data);
  }

  handleRemove = (id) => {
    const { information } = this.state;
    this.setState({
      information: information.filter(info => info.id !== id)
    });
  }

  handleUpdate = (id, data) => {
    const { information } = this.state;
    this.setState({
      information: information.map(
        info => id === info.id ? { ...info, ...data } : info
      )
    });
  }

  render() {
    const { information, keyword } = this.state;
    const filteredList = information.filter(
      info => info.name.indexOf(keyword) !== -1
    );

    return (
      <div>
        <PhoneForm onCreate={this.handleCreate} />
        <p>
          <input
            placeholder="검색할 이름을 입력하세요."
            onChange={this.handleChange}
            value={keyword}
            name="keyword"
          />
        </p>
        <hr />
        <PhoneInfoList data={filteredList}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

export default App;