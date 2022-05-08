import React from 'react';
import axios from 'axios';
import PeopleForm from './PeopleForm';
import PersonRow from './PersonRow';

class PeopleTable extends React.Component {

    state = {
        person: {
            firstName: '',
            lastName: '',
            age: ''
        },
        people: [],
        selectedIds: [],
        edit: false,
    }

    getAll = () => {
        axios.get('/api/people/getall').then(({ data }) => {
            this.setState({ people: data });
        });
    }

    componentDidMount() {
        this.getAll();
    }

    onTextChange = e => {
        const copy = { ...this.state.person };
        copy[e.target.name] = e.target.value;
        this.setState({ person: copy });
    }

    onAddClick = () => {
        axios.post('/api/people/addperson', this.state.person).then(() => {
            this.getAll();
            this.setState({
                person: {
                    firstName: '',
                    lastName: '',
                    age: '',
                }
            })
        });
    }

    onUpdateClick = () => {
        axios.post('/api/people/updatePerson', this.state.person).then(() => {
            this.getAll();
            this.setState({
                person: {
                    firstName: '',
                    lastName: '',
                    age: '',
                }
            })
        });
        this.cancel();
    }

    onDeleteClick = id => {
        axios.post(`/api/people/deletepeople?id=${id}`).then(() => {
            this.getAll();
        });
    }

    onSelectClick = id => {
        const { selectedIds } = this.state;
        if (selectedIds.includes(id)) {
            this.setState({ selectedIds: selectedIds.filter(l => l !== id) });
        } else {
            this.setState({ selectedIds: [...selectedIds, id] });
        }
    }

    onDeleteAll = () => {
        this.state.selectedIds.forEach(i => this.onDeleteClick(i));
    }

    edit = id => {
        this.setState({ edit: true, person: this.getPersonById(id) })
    }

    getPersonById = id => {
        return this.state.people.find(x => x.id === id);
    }

    cancel = () => {
        this.setState({
            edit: false, person: {
                firstName: '',
                lastName: '',
                age: '',
            }
        });
    }

    checkAll = () => {
        const { people } = this.state;
        this.setState({ selectedIds: people.map(x => x.id) });
    }

    unCheckAll = () => {
        this.setState({ selectedIds: [] });
    }

    render() {
        const { people, edit, selectedIds } = this.state;
        const { firstName, lastName, age } = this.state.person;
        return (
            <div className="container">
                {<PeopleForm firstName={firstName} lastName={lastName} age={age} onTextChange={this.onTextChange}
                    onAddClick={this.onAddClick} edit={edit} Cancel={this.cancel} Update={this.onUpdateClick} />}
                <table className="table table-striped table-bordered mt-4">
                    <thead>
                        <tr>
                            <th>
                                <button className="btn btn-danger btn-block" onClick={this.onDeleteAll}>Delete All</button>
                                <button className="btn btn-info btn-block" onClick={this.checkAll}>Check All</button>
                                <button className="btn btn-info btn-block" onClick={this.unCheckAll}>Uncheck All</button>
                            </th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {people.map((p, k) => <PersonRow person={p} key={k} onDeleteClick={this.onDeleteClick}
                            onSelectClick={this.onSelectClick} onEditClick={this.edit} selectedIds={selectedIds} />)}
                    </tbody>
                </table>
            </div>)
    }
}
export default PeopleTable;