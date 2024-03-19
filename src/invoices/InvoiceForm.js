import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {apiGet, apiPost, apiPut} from "../utils/api";
import InputSelect from "../components/InputSelect"

import InputField from "../components/InputField";
import FlashMessage from "../components/FlashMessage";


const InvoiceForm = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [invoice, setInvoice] = useState({
        invoiceNumber: "",
        issued: "",
        dueDate: "",
        product: "",
        price: "",
        vat: "",
        note: "",
        buyer: {
            _id: ""
        },
        seller: {
            _id: ""
        },});

    const [personListState, setPersonListState] = useState([]);
    const [sentState, setSent] = useState(false);
    const [successState, setSuccess] = useState(false);
    const [errorState, setError] = useState(null);

    useEffect(() => {
        if (id) {
            apiGet("/api/invoices/" + id).then((data) => setInvoice(data));
        }
    }, [id]);

    useEffect(() => {
        apiGet("/api/persons")
          .then((data) => setPersonListState(data))
    }, []);
    
    const handleSubmit = (e) => {
        e.preventDefault();

        (id ? apiPut("/api/invoices/" + id, invoice) : apiPost("/api/invoices", invoice))
            .then(() => {
                setSent(true);
                setSuccess(true);
                navigate("/invoices");
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
                setSent(true);
                setSuccess(false);
            });
    };

    const sent = sentState;
    const success = successState;

    return (
        <div className="container">
            <h1>{id ? "Upravit" : "Vytvořit"} fakturu</h1>
            <hr/>
            {errorState && (
                <div className="alert alert-danger">{errorState}</div>
            )}
            {sent && (
                <FlashMessage
                    theme={success ? "success" : ""}
                    text={success ? "Uložení faktury proběhlo úspěšně." : ""}
                />
            )}
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <InputField
                            required={true}
                            type="text"
                            name="invoiceNumber"
                            min="3"
                            label="Číslo faktury"
                            prompt="Zadejte číslo faktury"
                            value={invoice.invoiceNumber}
                            handleChange={(e) => {
                                setInvoice({...invoice, invoiceNumber: e.target.value});
                            }}
                        />
                    </div>
                    <div className="col-md-6">
                        <InputField
                            required={true}
                            type="text"
                            name="product"
                            label="Product"
                            prompt="Zadejte typ produktu"
                            value={invoice.product}
                            handleChange={(e) => {
                                setInvoice({...invoice, product: e.target.value});
                            }}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <InputField
                            required={true}
                            type="date"
                            name="issued"
                            label="Vystavení faktury"
                            prompt="Zadejte datum vystavení faktury"
                            value={invoice.issued}
                            handleChange={(e) => {
                                setInvoice({...invoice, issued: e.target.value});
                            }}
                        />
                    </div>
                    <div className="col-md-6">
                        <InputField
                            required={true}
                            type="date"
                            name="dueDate"
                            label="Splatnost faktury"
                            prompt="Zadejte datum splatnosti"
                            value={invoice.dueDate}
                            handleChange={(e) => {
                                setInvoice({...invoice, dueDate: e.target.value});
                            }}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <InputField
                            required={true}
                            type="number"
                            name="price"
                            label="Cena"
                            prompt="Zadejte cenu"
                            value={invoice.price}
                            handleChange={(e) => {
                                setInvoice({...invoice, price: e.target.value});
                            }}
                        />
                    </div>
                    <div className="col-md-6">
                        <InputField
                            required={true}
                            type="number"
                            name="Daň"
                            label="Daň"
                            prompt="Zadejte daň"
                            value={invoice.vat}
                            handleChange={(e) => {
                                setInvoice({...invoice, vat: e.target.value});
                            }}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <InputSelect
                            required={false}
                            name="Odběratel"
                            items={personListState}
                            multiple={false}
                            label="Dodavatel"
                            prompt="Vyber dodavatele"
                            value={invoice.buyer._id}
                            handleChange={(e) => {
                                setInvoice({...invoice, buyer: {
                                    _id: e.target.value
                                }});
                            }}
                        />
                    </div>
                    <div className="col-md-6">
                        <InputSelect
                            required={false}
                            name="Dodavatel"
                            items={personListState}
                            multiple={false}
                            label="Odběratel"
                            prompt="Vyber odběratele"
                            value={invoice.seller._id}
                            handleChange={(e) => {
                                setInvoice({...invoice, seller: {
                                    _id: e.target.value
                                }});
                            }}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <InputField
                            required={true}
                            type="text"
                            name="note"
                            label="Poznámka"
                            prompt="Zadejte poznámku"
                            value={invoice.note}
                            handleChange={(e) => {
                                setInvoice({...invoice, note: e.target.value});
                            }}
                        />
                    </div>
                </div>
                <br />
                <div className="row ">
                    <div className="col-md-12 text-end">
                        <button type="submit" className="btn btn-primary">Uložit</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default InvoiceForm;