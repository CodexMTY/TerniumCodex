import listaTrabajadores from "../ejemploTrabajadores";
import { Container, Dropdown, DropdownButton, Form, InputGroup } from 'react-bootstrap'
import { Link , useNavigate } from 'react-router-dom';
import { SearchOutlined, FilterFilled } from '@ant-design/icons';
import { Button, Input, Space, Table, Tag, Slider, Divider, List, Checkbox, Row, Col } from 'antd';
import { useState, useRef, useEffect, createContext } from "react";
import DeleteConfirm from '../components/DeleteConfirm';

function ListaEmpleados() {

    const navigate = useNavigate();

    const [empleados, setEmpleados] = useState([]);

    const chooseEmpleados = (empleados) => {
        setEmpleados(empleados);
    }

    const navigateUser = (id) => {
        var selection = window.getSelection();
        if(!selection.toString()) {
            navigate(`/users/${id}`)
        }
    }

    useEffect(() => {
        fetchEmpleados()
    }, []);

    const fetchEmpleados = async () => {
        let response = await (
            await fetch("https://codextern-4ny2.onrender.com/users")
        ).json();
        setEmpleados(response);
    };

    const distinctColumns = (dataIndex) => {
        var lookup = {};
        var result = [];

        for (var item, i = 0; item = empleados[i++];) {
            var distinct = item[dataIndex];

            if (!(distinct in lookup) && distinct != null) {
                lookup[distinct] = 1;
                result.push(distinct);
            }
        }
        return result;
    }

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters, confirm) => {
        clearFilters();
        setSearchText('');
        confirm()
    };

    const filtroBusqueda = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Buscar ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Buscar
                    </button>
                    <button
                        onClick={() => clearFilters && handleReset(clearFilters, confirm)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#ffffff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
    });

    const [sliderValue, setSliderValue] = useState([0, 100])

    const onChange = (value) => {
        setSliderValue(value);
    };

    const marks = {
        0: sliderValue[0],
        100: sliderValue[1]
    }

    const rango = (start, end) => {
        const range = [...Array(end - start + 1).keys()].map(x => x + start);
        return range
    };

    const handleRangeSearch = (setSelectedKeys, selectedKeys, confirm, dataIndex) => {
        if (typeof selectedKeys[0] === 'string' && selectedKeys[0].includes('-')) {
            let first = selectedKeys[0].substring(0, selectedKeys[0].indexOf('-'))
            let last = selectedKeys[0].substring((selectedKeys[0].indexOf('-') + 1), (selectedKeys[0].length))
            setSelectedKeys(rango(Number(first), Number(last)))
            confirm();
            setSearchText(rango(Number(first), Number(last)))
            setSearchedColumn(dataIndex)
        } else {
            confirm();
            setSearchText(selectedKeys);
            setSearchedColumn(dataIndex);
        }
    };

    const filtroRango = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Buscar ${dataIndex}`}
                    value={typeof selectedKeys[0] === 'undefined' ? "" : selectedKeys[0] != selectedKeys.slice(-1) ? `${selectedKeys[0]}-${selectedKeys.slice(-1)}` : selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleRangeSearch(setSelectedKeys, selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Divider />
                <Slider
                    marks={marks}
                    range
                    step={1}
                    defaultValue={[20, 50]}
                    onChange={onChange}
                    onAfterChange={value => setSelectedKeys(value ? rango(value[0], value[1]) : [])}
                    tooltip={{
                        open: false,
                    }}
                />
                <Space>
                    <button
                        type="primary"
                        onClick={() => handleRangeSearch(setSelectedKeys, selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Buscar
                    </button>
                    <button
                        onClick={() => clearFilters && handleReset(clearFilters, confirm)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <FilterFilled
                style={{
                    color: filtered ? '#ffffff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex] == value,
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100)
            }
        },
    });

    const [checkedValues, setCheckedValues] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const keyOptions = [
        { label: 'Key talent', value: true },
        { label: 'No', value: false },
    ];

    const handleCheckAll = () => {
        const allValues = keyOptions.map((option) => option.value);
        setCheckedValues(allValues);
        setSelectAll(true);
    };

    const handleUncheckAll = () => {
        setCheckedValues([]);
        setSelectAll(false);
    };

    const handleCheckboxChange = (checkedValues) => {

        setCheckedValues(checkedValues);
        setSelectAll(checkedValues.length === keyOptions.length);
    };

    const handleSelectAllChange = (e) => {
        const checked = e.target.checked;
        if (checked) {
            handleCheckAll();
        } else {
            handleUncheckAll();
        }
    };

    const handleKeySearch = (setSelectedKeys, selectedKeys, confirm, dataIndex) => {
        setSelectedKeys(checkedValues);
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const filtroKeyTalent = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Checkbox className="checkbox-all" checked={selectAll} onChange={handleSelectAllChange}>
                    Seleccionar todo
                </Checkbox>
                <Checkbox.Group options={keyOptions} value={checkedValues} onChange={handleCheckboxChange} />
                <Divider></Divider>
                <Space>
                    <button
                        type="primary"
                        onClick={() => handleKeySearch(setSelectedKeys, selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Buscar
                    </button>
                    <button
                        onClick={() => clearFilters && handleReset(clearFilters, confirm)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <FilterFilled
                style={{
                    color: filtered ? '#ffffff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex] == value,
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
    });

    const filtroListaOpciones = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Buscar ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Divider />
                <Checkbox className="checkbox-all" checked={selectAll} onChange={handleSelectAllChange}>
                    Seleccionar todo
                </Checkbox>
                <Checkbox.Group options={distinctColumns(dataIndex)} value={checkedValues} onChange={handleCheckboxChange} />
                <Divider />
                <Space>
                    <button
                        type="primary"
                        onClick={() => handleKeySearch(setSelectedKeys, selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Buscar
                    </button>
                    <button
                        onClick={() => clearFilters && handleReset(clearFilters, confirm)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <FilterFilled
                style={{
                    color: filtered ? '#ffffff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
    });

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre',
            ...filtroBusqueda('nombre'),
        },
        {
            title: 'Apellidos',
            dataIndex: 'apellidos',
            key: 'apellidos',
            responsive: ['xl'],
            ...filtroBusqueda('apellidos')
        },
        {
            title: 'IDM4',
            dataIndex: 'idm4',
            key: 'idm4',
            responsive: ['md'],
            ...filtroBusqueda('idm4')
        },
        {
            title: 'CET',
            dataIndex: 'cet',
            key: 'cet',
            responsive: ['md'],
            ...filtroBusqueda('cet')
        },
        {
            title: 'Key Talent',
            dataIndex: 'key_talent',
            key: 'key_talent',
            ...filtroKeyTalent('key_talent'),
            render: (key_talent) =>
                <Tag color={key_talent ? 'green' : 'red'} key={'key'}>
                    {key_talent ? 'key' : 'no'}
                </Tag>
        },
        {
            title: 'Edad',
            dataIndex: 'edad',
            key: 'edad',
            ...filtroRango('edad'),
            render: (text) => <>{text ? text + ' años' : text}</>,
            sorter: (a, b) => a.edad - b.edad,
            sortDirections: ['descend', 'ascend'],
            showSorterTooltip: false
        },
        {
            title: 'Antigüedad',
            dataIndex: 'antiguedad',
            key: 'antiguedad',
            ...filtroRango('antiguedad'),
            render: (text) => <>{text ? text + ' años' : text}</>,
            sorter: (a, b) => a.antiguedad - b.antiguedad,
            sortDirections: ['descend', 'ascend'],
            showSorterTooltip: false
        },
        {
            title: 'Puesto',
            dataIndex: 'puesto',
            key: 'puesto',
            ...filtroListaOpciones('puesto'),
        },
        {
            title: 'Estructura3',
            dataIndex: 'estructura3',
            key: 'estructura3',
            responsive: ['lg'],
            ...filtroListaOpciones('estructura3'),
        },
        {
            title: 'Estructura4',
            dataIndex: 'estructura4',
            key: 'estructura4',
            responsive: ['lg'],
            ...filtroListaOpciones('estructura4'),
        },
        {
            title: 'Estructura5',
            dataIndex: 'estructura5',
            key: 'estructura5',
            responsive: ['lg'],
            ...filtroListaOpciones('estructura5'),
        },
        {
            title: 'Encuadre',
            dataIndex: 'encuadre',
            key: 'encuadre',
            responsive: ['lg'],
            ...filtroListaOpciones('encuadre')
        },
        {
            title: 'PC-CAT',
            dataIndex: 'pc_cat',
            key: 'pc_cat',
            responsive: ['md'],
            ...filtroBusqueda('pc_cat')
        },
        {
            title: 'Borrar',
            key: 'operation',
            responsive: ['sm'],
            onCell: () => ({onClick: (e) => e.stopPropagation()}),
            render: (record) =>
                <DeleteConfirm userId={record.id} chooseEmpleados={chooseEmpleados} listaEmpleados={empleados}/>,
        }
    ];

    return <>
        <Table columns={columns} rowKey={(record) => record.id}
            expandable={{
                expandedRowRender: (record) =>
                    <>
                        <p>Email: {record.email}</p>
                        <p style={{ margin: 0 }}>{record.resumen}</p>

                    </>
                ,
            }}
            onRow={(record) => ({onClick: () => {navigateUser(record.id)}})}
            dataSource={empleados} scroll={{ x: 1800 }} />
    </>;
};

export default ListaEmpleados;