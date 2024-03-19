import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {apiGet} from "../utils/api";

const InvoiceDetails = ({}) => {
    const { id } = useParams();
    const [invoice, setInvoice] = useState({});
    

    
    useEffect(() => {
        apiGet("/api/invoices/" + id).then((data) => setInvoice(data));
        
      }, [id]);

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header bg-dark text-white">
                    <h1 className="card-title mb-0">Detail Faktury</h1>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <h3>Číslo faktury: {invoice.invoiceNumber}</h3>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-md-6">
                            <p>
                                <strong>Kupující:</strong><br/>
                                <a href={`/persons/show/${invoice.seller?._id}`}>{invoice.seller?.name}</a>
                            </p>
                        </div>
                        <div className="col-md-6">
                            <p>
                                <strong>Prodejce:</strong><br/>
                                <a href={`/persons/show/${invoice.buyer?._id}`}>{invoice.buyer?.name}</a>
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <p>
                                <strong>Vystavení faktury:</strong><br/>
                                {invoice.issued}
                            </p>
                        </div>
                        <div className="col-md-6">
                            <p>
                                <strong>Splatnost faktury:</strong><br/>
                                {invoice.dueDate}
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <p>
                                <strong>Produkt:</strong><br/>
                                {invoice.product}
                            </p>
                        </div>
                        <div className="col-md-6">
                            <p>
                                <strong>Cena:</strong><br/>
                                {invoice.price}
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <p>
                                <strong>VAT:</strong><br/>
                                {invoice.vat}
                            </p>
                        </div>
                        <div className="col-md-6">
                            <p>
                                <strong>Poznámka:</strong><br/>
                                {invoice.note}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceDetails;