const InvoiceStatisticsTable = ({invoices}) => {
    return (
        <>
            <h2 className="text-center">Statistiky všech faktur</h2>
            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                    <thead className="table-success">
                        <tr>
                            <th scope="col">Ceny za celou dobu</th>
                            <th scope="col">Ceny za letošní rok</th>
                            <th scope="col">Počet faktur v databázi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((invoice, index) => (
                            <tr key={index + 1}>
                                <td>{invoice.allTime} Kč</td>
                                <td>{invoice.currentYear} Kč</td>
                                <td>{invoice.allTimeCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default InvoiceStatisticsTable;