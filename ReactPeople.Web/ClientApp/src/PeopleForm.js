import React from 'react';

class PersonForm extends React.Component {
    render() {
        const { firstName, lastName, age, onTextChange, onAddClick, edit, Cancel, Update } = this.props;
        return <div className="container mt-5">
            <div className="row">
                <div className="col-md-3">
                    <input type="text" className="form-control" placeholder="First Name" name="firstName" onChange={onTextChange} value={firstName} />
                </div>
                <div className="col-md-3">
                    <input type="text" className="form-control" placeholder="Last Name" name="lastName" onChange={onTextChange} value={lastName} />
                </div>
                <div className="col-md-3">
                    <input type="text" className="form-control" placeholder="Age" name="age" onChange={onTextChange} value={age} />
                </div>
                <div className="col-md-3">
                    {edit ? <div> <button className="btn btn-primary btn-block" onClick={Cancel} >Cancel</button>
                        <button className="btn btn-warning btn-block" onClick={Update} >Update</button> </div>
                        : <button className="btn btn-primary btn-block" onClick={onAddClick} > Add</button>}
                </div>
            </div>
        </div>
    }
}
export default PersonForm;