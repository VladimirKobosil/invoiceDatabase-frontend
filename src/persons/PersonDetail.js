import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {apiGet} from "../utils/api";
import Country from "./Country";
import InvoicesTable from "./PersonInvoiceTable";




const PersonDetail = () => {
    const { id } = useParams();
    const [person, setPerson] = useState({});
    const [purchasesInvoices, setPurchasesInvoices] = useState([]);
    const [salesInvoices, setSalesInvoices] = useState([]);


    useEffect(() => {
        apiGet("/api/persons/" + id)
            .then((data) => {
                setPerson(data);
                return data.identificationNumber; 
            })
            .then((identificationNumber) => {
                apiGet(`/api/identification/${identificationNumber}/sales`)
                    .then((data) => setSalesInvoices(data))
    
                apiGet(`/api/identification/${identificationNumber}/purchases`)
                    .then((data) => setPurchasesInvoices(data))
            })
    }, [id]);

    const country = Country.CZECHIA === person.country ? "Česká republika" : "Slovensko";

    return (
        <> 
            <div>
                <h1 className="mt-3">Detail osoby</h1>
                <hr/>
                <h3>{person.name} ({person.identificationNumber})</h3>
                <p>
                    <strong>DIČ:</strong>
                    <br/>
                    {person.taxNumber}
                </p>
                <p>
                    <strong>Bankovní účet:</strong>
                    <br/>
                    {person.accountNumber}/{person.bankCode} ({person.iban})
                </p>
                <p>
                    <strong>Tel.:</strong>
                    <br/>
                    {person.telephone}
                </p>
                <p>
                    <strong>Mail:</strong>
                    <br/>
                    {person.mail}
                </p>
                <p>
                    <strong>Sídlo:</strong>
                    <br/>
                    {person.street}, {person.city},
                    {person.zip}, {country}
                </p>
                <p>
                    <strong>Poznámka:</strong>
                    <br/>
                    {person.note}
                </p>
                     
            </div>
            <hr />
            <div>
                <InvoicesTable kind="sales" invoices={salesInvoices} />
                <hr />
                <InvoicesTable kind="purchases" invoices={purchasesInvoices} />
                <hr />
            </div>
        </>
          
    );
    
};

export default PersonDetail;
