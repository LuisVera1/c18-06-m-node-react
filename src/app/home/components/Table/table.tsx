
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface Product {
    id: string;
    code: string;
    name: string;
    description: string;
    image: string;
    price: number;
    category: string;
    quantity: number;
    inventoryStatus: string;
    rating: number;
}

export default function BasicDemo() {
    const [products, setProducts] = useState<Product[]>([]);

    // useEffect(() => {
    //     ProductService.getProductsMini().then(data => setProducts(data));
    // }, []);

    return (
        <div className="card ml-40">
            <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                <Column field="Estudiante" header="Estudiante"></Column>
                <Column field="Fecha" header="Fecha"></Column>
                <Column field="Tema" header="Tema"></Column>
                <Column field="Estado" header="Estado"></Column>
            </DataTable>
        </div>
    );
}
