
import React from "react";
import {Link} from "react-router-dom";

const PersonTable = ({label, items, deletePerson}) => {
    return (
        <div>
            <div className="row">
                <div className="col mt-4 mb-2">
                    <h1>Seznam osob</h1>
                </div>
                <div className="col text-end mt-5 mb-2">
                        <h6>{label} <span className="badge bg-primary">{items.length}</span></h6>
                </div>
            </div>
            <table className="table table-bordered table-striped table-hover">
                <thead className="table-primary">
                    <tr>
                        <th>#</th>
                        <th>Jméno</th>
                        <th colSpan={3}>Akce</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index + 1}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>
                                <div className="btn-group">
                                    <Link
                                        to={"/persons/show/" + item._id}
                                        className="btn btn-sm btn-info"
                                    >
                                        Zobrazit
                                    </Link>
                                    <Link
                                        to={"/persons/edit/" + item._id}
                                        className="btn btn-sm btn-warning"
                                    >
                                        Upravit
                                    </Link>
                                    <button
                                        onClick={() => deletePerson(item._id)}
                                        className="btn btn-sm btn-danger"
                                    >
                                        Odstranit
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div >
                <Link to={"/persons/create"} className="btn btn-success">
                    Nová osoba
                </Link>
            </div>
        </div>
    );
};

export default PersonTable;
