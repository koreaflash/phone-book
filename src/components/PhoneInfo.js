import { Component } from "react";

class PhoneInfo extends Component {
    static defaultProps = {
        info: {
            name: '이름',
            phone: '010-000-0000',
            id: 0
        }
    }

    state = {
        editing: false,
        name: '',
        phone: ''
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!this.state.editing &&
            !nextState.editing &&
            nextProps.info === this.props.info) {
            return false;
        }

        return true;
    }

    handleRemove = () => {
        const { info, onRemove } = this.props;
        onRemove(info.id);
    }

    handleToggleEdit = () => {
        const { editing } = this.state;
        this.setState({ editing: !editing });
    }

    hadleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    componentDidUpdate(prevProps, prevState) {
        const { info, onUpdate } = this.props;
        if (!prevState.editing && this.state.editing) {
            this.setState({
                name: info.name,
                phone: info.phone
            });
        }

        if (prevState.editing && !this.state.editing) {
            onUpdate(info.id, {
                name: this.state.name,
                phone: this.state.phone
            });
        }
    }

    render() {
        console.log('render PhoneInfo ' + this.props.info.id)

        const style = {
            border: '1px solid black',
            padding: '8px',
            margin: '8px'
        }

        const { editing } = this.state;
        if (editing) {
            return (
                <div style={style}>
                    <div>
                        <input value={this.state.name}
                            name="name"
                            placeholder="이름"
                            onChange={this.hadleChange}
                        />
                    </div>
                    <div>
                        <input value={this.state.phone}
                            name="phone"
                            placeholder="전화번호"
                            onChange={this.hadleChange}
                        />
                    </div>
                    <button onClick={this.handleToggleEdit}>적용</button>
                    <button onClick={this.handleRemove}>삭제</button>
                </div>
            );
        }

        const { name, phone } = this.props.info;

        return (
            <div style={style}>
                <div><b>{name}</b></div>
                <div>{phone}</div>
                <button onClick={this.handleToggleEdit}>수정</button>
                <button onClick={this.handleRemove}>삭제</button>
            </div>
        );
    }
}

export default PhoneInfo;