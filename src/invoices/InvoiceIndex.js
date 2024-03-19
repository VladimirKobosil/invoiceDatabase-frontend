import React, {useEffect, useState} from "react";

import {apiDelete, apiGet} from "../utils/api";
import InvoiceFilter from "./InvoiceFilter";
import InvoiceTable from "./InvoiceTable";
import InvoiceStatisticsTable from "./InvoiceStatistics";

const InvoiceIndex = ({ productListState, sellerListState, buyerListState}) => {
    const [invoiceStatistics, setInvoiceStatistics] = useState([]);
    const [invoicesState, setInvoices] = useState([]);
    const [filterState, setFilter] = useState({
        buyerID: undefined,
        sellerID: undefined,
        product: undefined,
        maxPrice: undefined,
        minPrice: undefined,
        limit: undefined,
        });
    
    const deleteInvoice = async (id) => {
        try {
            await apiDelete("/api/invoices/" + id);
        } catch (error) {
            console.log(error.message);
            alert(error.message)
        }
        setInvoices(invoices.filter((item) => item._id !== id));
    };

    useEffect(() => {
        apiGet(`/api/invoices/statistics`).then((data) => setInvoiceStatistics(data));
        apiGet('/api/invoices').then((data) => setInvoices(data));
    }, []);

    const handleChange = (e) => {
        
        if (e.target.value === "false" || e.target.value === "true" || e.target.value === '') {
            setFilter(prevState => {
                return {...prevState, [e.target.name]: undefined}
            });
        } else {
            setFilter(prevState => {
                return { ...prevState, [e.target.name]: e.target.value}
            });
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const params = filterState;
    
        const data = await apiGet("/api/invoices", params);
        setInvoices(data);
    };

    return (
        <div>
            <br />
            <InvoiceStatisticsTable invoices={invoiceStatistics} />
            <hr />
            <h1 className="text-center">Seznam faktur</h1>
            <InvoiceFilter
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                buyerList={buyerListState}
                sellerList={sellerListState}
                productList={productListState}
                filter={filterState}
                confirm="Filtrovat faktury"
            />
            <InvoiceTable deleteInvoice={deleteInvoice} items={invoicesState} label="Počet zobrazených faktur:" />
        </div>
    );
};

export default InvoiceIndex;