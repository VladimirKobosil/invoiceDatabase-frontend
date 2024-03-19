const PersonStatisticsTable = ({invoices}) => {
    return (
        <>
    <div className="text-center">
        <h2>Statistiky jednotlivých osob</h2>
    </div>
            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="table-success">
                        <tr>
                            <th>Jméno/název</th>
                            <th>Příjmy</th>
                            <th>Obrat za loňský rok</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((person) => (
                            <tr key={person.personName}>
                                <td>{person.personName}</td>
                                <td>{person.revenue} Kč</td>
                                <td>{person.turnoverLastYear} Kč</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default PersonStatisticsTable;