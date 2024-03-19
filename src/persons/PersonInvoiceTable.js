const InvoicesTable = ({ kind, invoices}) => {
    return (
        <div>
            <h2 className={`mb-4 ${kind === "sales" ? "text-success" : "text-primary"}`}>
                {kind === "sales" ? "Vystavené faktury" : "Přijaté faktury"}
            </h2>
            <table className="table table-bordered table-striped table-hover">
                <thead className={`${kind === "sales" ? "bg-success text-white" : "bg-primary text-white"}`}>
                <tr>
                    <th>Číslo faktury</th>
                    <th>{kind === "sales" ? "Kupující" : "Prodejce"}</th>
                    <th>Vystavení faktury</th>
                    <th>Splatnost</th>
                    <th>Cena</th>
                </tr>
                </thead>
                <tbody>
                {invoices.map((invoice, index) => (
                    <tr key={index}>
                    <td>{invoice.invoiceNumber}</td>
                    <td>{kind === "sales" ? invoice.buyer?.name : invoice.seller?.name}</td>
                    <td>{invoice.issued}</td>
                    <td>{invoice.dueDate}</td>
                    <td>{invoice.price}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default InvoicesTable;

