import React, { useEffect, useState } from 'react';
import {
    DetailsListLayoutMode,
    Selection,
    SelectionMode,
    ShimmeredDetailsList
} from '@fluentui/react';

import { restClient } from '../../services/restClient';
import './computadora.css';

export const Computadora = () => {
    const [computadoras, setComputadoras] = useState(undefined);
    const [filtro, setFiltro] = useState([]);
    const [computadora, setComputadora] = useState();

    useEffect(() => {
        fetchComputadoras();
    }, []);

    const fetchComputadoras = async () => {
        const response = await restClient.httpGet('/computadora');

        if (!response.length) {
            return;
        }

        setComputadoras(response.map(item => ({ ...item, nombreMarca: item.marca.nombre })));
    }

    const handleSearchComputadora = value => {
        if (!value) {
            setComputadoras(undefined);
            setFiltro([]);
            fetchComputadoras();

            return;
        }

        const dataFilter = computadoras && computadoras.filter(item => item.nombre.toUpperCase().includes(value.toUpperCase()));

        setFiltro(dataFilter);
    }

    const seleccion = new Selection({
        onSelectionChanged: () => {
            const itemSeleccionado = seleccion.getSelection();

            setComputadora(itemSeleccionado.length ? itemSeleccionado[0] : null);

        },
    });

    const columns = [
        { key: 'column1', name: 'Id', fieldName: 'id', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column2', name: 'Nombre Computadora', fieldName: 'nombre', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column3', name: 'Tipo de Disco', fieldName: 'tipoDisco', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column4', name: 'Precio', fieldName: 'precio', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column3', name: 'MarcaId', fieldName: 'marcaId', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column3', name: 'Nombre Marca', fieldName: 'nombreMarca', minWidth: 100, maxWidth: 200, isResizable: true }
    ]

    return (
        <div >
            <div className="contenedorLista">
                <ShimmeredDetailsList
                    items={filtro.length ? filtro : computadoras}
                    columns={columns}
                    layoutMode={DetailsListLayoutMode.justified}
                    selection={seleccion}
                    selectionPreservedOnEmptyClick={true}
                    selectionMode={SelectionMode.single}
                    enableShimmer={!computadoras}
                />
            </div>
        </div>
    )
}