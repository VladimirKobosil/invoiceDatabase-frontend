
import React, {useEffect, useState} from "react";

import {apiDelete, apiGet} from "../utils/api";
import PersonStatisticsTable from "./PersonStatistics";
import PersonTable from "./PersonTable";

const PersonIndex = () => {
    const [persons, setPersons] = useState([]);
    const [personStatistics, setPersonStatistics] = useState([]);

    const deletePerson = async (id) => {
        try {
            await apiDelete("/api/persons/" + id);
        } catch (error) {
            console.log(error.message);
            alert(error.message)
        }
        setPersons(persons.filter((item) => item._id !== id));
    };

    useEffect(() => {
        apiGet("/api/persons").then((data) => setPersons(data));
        apiGet(`/api/persons/statistics`).then((data) => setPersonStatistics(data));
    }, []);

    return (
        <div>
            <PersonTable
                deletePerson={deletePerson}
                items={persons}
                label="Počet osob:"
            />
            <hr />
            <PersonStatisticsTable invoices={personStatistics} />
        </div>
    );
};
export default PersonIndex;
