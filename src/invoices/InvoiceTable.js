import React from "react";
import {Link} from "react-router-dom";

const InvoiceTable = ({label, items, deleteInvoice}) => {
    return (
        <div>
            <p className="text-end">
                {label} <span className="badge bg-primary">{items.length}</span>
            </p>

            <table className="table table-bordered table-striped table-hover">
                <thead className="table-primary">
                    <tr>
                        <th>#</th>
                        <th>Číslo faktury</th>
                        <th>Odběratel</th>
                        <th>Dodavatel</th>
                        <th>Cena</th>
                        <th>Produkt</th>
                        <th colSpan={3}>Akce</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index + 1}>
                            <td>{index + 1}</td>
                            <td>{item.invoiceNumber}</td>
                            <td>{item.buyer.name}</td>
                            <td>{item.seller.name}</td>
                            <td>{item.price}</td>
                            <td>{item.product}</td>
                            <td>
                                <div className="btn-group">
                                    <Link
                                        to={"/invoices/show/" + item._id}
                                        className="btn btn-sm btn-info"
                                    >
                                        Zobrazit
                                    </Link>
                                    <Link
                                        to={"/invoices/edit/" + item._id}
                                        className="btn btn-sm btn-warning"
                                    >
                                        Upravit
                                    </Link>
                                    <button
                                        onClick={() => deleteInvoice(item._id)}
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
                <Link to={"/invoices/create"} className="btn btn-success">
                    Nová faktura
                </Link>
                <hr />
            </div>
        </div>
    );
};

export default InvoiceTable;
