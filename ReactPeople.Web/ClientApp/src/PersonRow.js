import React from 'react';

class PersonRow extends React.Component {
    render() {
        const { person, key, onDeleteClick, onSelectClick, onEditClick, selectedIds } = this.props;
        return <tr key={key}>
            <td><input type="checkbox" checked={selectedIds.includes(person.id)} onChange={() => onSelectClick(person.id)} className="form-control" /></td>
            <td>{person.firstName}</td>
            <td>{person.lastName}</td>
            <td>{person.age}</td>
            <td>
                <button className="btn btn-warning" onClick={() => onEditClick(person.id)} > Edit</button>
                <button className="btn btn-danger" onClick={() => onDeleteClick(person.id)} > Delete</button>
            </td>
        </tr>
    }
}

export default PersonRow;