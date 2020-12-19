import React, { useEffect, useState } from 'react';
import {
    DetailsListLayoutMode,
    Selection,
    SelectionMode,
    ShimmeredDetailsList
} from '@fluentui/react';

import { restClient } from '../../services/restClient';
import './marca.css';

export const Marca = () => {
    const [marcas, setMarcas] = useState(undefined);
    const [filtro, setFiltro] = useState([]);
    const [marca, setMarca] = useState();

    useEffect(() => {
        fetchMarcas();
    }, []);

    const fetchMarcas = async () => {
        const response = await restClient.httpGet('/marca');

        if (!response.length) {
            return;
        }

        setMarcas(response.map(item => ({ ...item })));
    }

    const handleSearchMarca = value => {
        if (!value) {
            setMarcas(undefined);
            setFiltro([]);
            fetchMarcas();

            return;
        }

        const dataFilter = marcas && marcas.filter(item => item.nombre.toUpperCase().includes(value.toUpperCase()));

        setFiltro(dataFilter);
    }

    const seleccion = new Selection({
        onSelectionChanged: () => {
            const itemSeleccionado = seleccion.getSelection();

            setMarca(itemSeleccionado.length ? itemSeleccionado[0] : null);

        },
    });

    const columns = [
        { key: 'column1', name: 'Id', fieldName: 'id', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column2', name: 'Nombre Marca', fieldName: 'nombre', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column3', name: 'Año', fieldName: 'anio', minWidth: 100, maxWidth: 200, isResizable: true }
    ]

    return (
        <div className="">
            <div className="contenedorLista">
                <ShimmeredDetailsList
                    items={filtro.length ? filtro : marcas}
                    columns={columns}
                    layoutMode={DetailsListLayoutMode.justified}
                    selection={seleccion}
                    selectionPreservedOnEmptyClick={true}
                    selectionMode={SelectionMode.single}
                    enableShimmer={!marcas}
                />
            </div>
        </div>
    )
}