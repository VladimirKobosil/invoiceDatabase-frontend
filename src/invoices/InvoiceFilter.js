import React from "react";
import InputField from "../components/InputField";
import InputSelect from "../components/InputSelect";
import { useState, useEffect } from "react";
import { apiGet } from "../utils/api";

const InvoiceFilter = (props) => {

    const [personListState, setPersonListState] = useState([]);
    

    const handleChange = (e) => {
        props.handleChange(e);
    };

    const handleSubmit = (e) => {
        props.handleSubmit(e);
    };

    const filter = props.filter;

    useEffect(() => {
        apiGet("/api/persons")
          .then((data) => setPersonListState(data))
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-6">
                    <InputSelect
                        required={false}
                        name="Odběratel"
                        items={personListState}
                        multiple={false}
                        label="Odběratel"
                        prompt="Vyberte odběratele"
                        value={filter.buyerID} 
                        handleChange={(e) => {
                            props.handleChange({ target: { name: "buyerID", value: e.target.value } });
                        }}
                    />
                </div>
                <div className="col-md-6">
                    <InputSelect
                        required={false}
                        name="Dodavatel"
                        items={personListState}
                        multiple={false}
                        label="Dodavatel"
                        prompt="Vyberte dodavatele"
                        value={filter.sellerID} 
                        handleChange={(e) => {
                            props.handleChange({ target: { name: "sellerID", value: e.target.value } });
                        }}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-3">
                    <InputField
                        type="text"
                        name="product"
                        handleChange={handleChange}
                        label="Produkt"
                        min = "2"
                        placeholder="Enter product name"
                        prompt="Název produktu"
                        value={filter.product || ""}
                    />
                </div>
                <div className="col-md-3">
                    <InputField
                        type="number"
                        min="0"
                        name="minPrice"
                        handleChange={handleChange}
                        label="Minimální cena"
                        prompt="neuveden"
                        value={filter.minPrice ? filter.minPrice : ""}
                    />
                </div>
                <div className="col-md-3">
                    <InputField
                        type="number"
                        min="0"
                        name="maxPrice"
                        handleChange={handleChange}
                        label="Maximální cena"
                        prompt="neuveden"
                        value={filter.maxPrice ? filter.maxPrice : ""}
                    />
                </div>
                <div className="col-md-3">
                    <InputField
                        type="number"
                        min="1"
                        name="limit"
                        handleChange={handleChange}
                        label="Limit počtu faktur"
                        prompt="neuveden"
                        value={filter.limit ? filter.limit : ""}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <input type="submit" className="btn btn-primary float-right mt-2" value={props.confirm} />
                </div>
            </div>
        </form>
    );
};

export default InvoiceFilter;