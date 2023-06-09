import { useNavigate } from "react-router-dom";
import { SearchOutlined, FilterFilled } from "@ant-design/icons";
import { Input, Space, Table, Tag, Slider, Divider, List, Checkbox, Row, Col, Button } from "antd";
import { useState, useRef, useEffect } from "react";
import DeleteConfirm from "../components/DeleteConfirm";
import Cookies from "js-cookie";
import { getRequest } from "../apiUtils";

function ListaEmpleados() {

    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});

    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };

    const clearFilters = () => {
        setFilteredInfo({});
    };

    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
    };

    const navigate = useNavigate();

    const [empleados, setEmpleados] = useState([]);

    const chooseEmpleados = (empleados) => {
        setEmpleados(empleados);
    }

    const navigateUser = (id) => {
        var selection = window.getSelection();
        if (!selection.toString()) {
            navigate(`/users/${id}`)
        }
    }

    useEffect(() => {
        fetchEmpleados()
    }, []);

    const fetchEmpleados = async () => {
        const data = await getRequest("users", Cookies.get("token"));
        setEmpleados(data);
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

    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters, confirm) => {
        clearFilters();
        setSearchText("");
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
                        display: "block",
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
                    color: filtered ? "#ffffff" : undefined,
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
        if (typeof selectedKeys[0] === "string" && selectedKeys[0].includes("-")) {
            let first = selectedKeys[0].substring(0, selectedKeys[0].indexOf("-"))
            let last = selectedKeys[0].substring((selectedKeys[0].indexOf("-") + 1), (selectedKeys[0].length))
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
                    value={typeof selectedKeys[0] === "undefined" ? "" : selectedKeys[0] != selectedKeys.slice(-1) ? `${selectedKeys[0]}-${selectedKeys.slice(-1)}` : selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleRangeSearch(setSelectedKeys, selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: "block",
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
                    color: filtered ? "#ffffff" : undefined,
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
        { label: "Key talent", value: true },
        { label: "No", value: false },
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
                    color: filtered ? "#ffffff" : undefined,
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
                        display: "block",
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
                    color: filtered ? "#ffffff" : undefined,
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
            title: "Nombre",
            dataIndex: "nombre",
            key: "nombre",
            filteredValue: filteredInfo.nombre || null,
            fixed: "left",
            ...filtroBusqueda('nombre'),
        },
        {
            title: "Apellidos",
            dataIndex: "apellidos",
            key: "apellidos",
            filteredValue: filteredInfo.apellidos || null,
            responsive: ["xl"],
            fixed: "left",
            ...filtroBusqueda("apellidos")
        },
        {
            title: "IDM4",
            dataIndex: "idm4",
            key: "idm4",
            filteredValue: filteredInfo.idm4 || null,
            responsive: ["md"],
            ...filtroBusqueda("idm4")
        },
        {
            title: "CET",
            dataIndex: "cet",
            key: "cet",
            filteredValue: filteredInfo.cet || null,
            responsive: ["md"],
            ...filtroBusqueda("cet")
        },
        {
            title: "Key Talent",
            dataIndex: "key_talent",
            key: "key_talent",
            filteredValue: filteredInfo.key_talent || null,
            ...filtroKeyTalent("key_talent"),
            render: (key_talent) =>
                <Tag color={key_talent ? "green" : "red"} key={"key"}>
                    {key_talent ? "key" : "no"}
                </Tag>
        },
        {
            title: "Edad",
            dataIndex: "edad",
            key: "edad",
            filteredValue: filteredInfo.edad || null,
            sortOrder: sortedInfo.columnKey === "edad" ? sortedInfo.order : null,
            ...filtroRango("edad"),
            render: (text) => <>{text || text==0 ? text + " años" : text}</>,
            sorter: (a, b) => a.edad - b.edad,
            sortDirections: ["descend", "ascend"],
            showSorterTooltip: false
        },
        {
            title: 'Antigüedad',
            dataIndex: 'antiguedad',
            key: 'antiguedad',
            filteredValue: filteredInfo.antiguedad || null,
            sortOrder: sortedInfo.columnKey === 'antiguedad' ? sortedInfo.order : null,
            ...filtroRango('antiguedad'),
            render: (text) => <>{text || text == 0 ? text + ' años' : text}</>,

            title: "Antigüedad",
            dataIndex: "antiguedad",
            key: "antiguedad",
            filteredValue: filteredInfo.antiguedad || null,
            sortOrder: sortedInfo.columnKey === "antiguedad" ? sortedInfo.order : null,
            ...filtroRango("antiguedad"),
            render: (text) => <>{text || text==0 ? text + " años" : text}</>,
            sorter: (a, b) => a.antiguedad - b.antiguedad,
            sortDirections: ["descend", "ascend"],
            showSorterTooltip: false
        },
        {
            title: "Puesto",
            dataIndex: "puesto",
            key: "puesto",
            filteredValue: filteredInfo.puesto || null,
            ...filtroListaOpciones("puesto"),
        },
        {
            title: "Jefe",
            dataIndex: "jefe",
            key: "jefe",
            filteredValue: filteredInfo.jefe || null,
            responsive: ["xl"],
            ...filtroListaOpciones("jefe")
        },
        {
            title: "Estructura3",
            dataIndex: "estructura3",
            key: "estructura3",
            filteredValue: filteredInfo.estructura3 || null,
            responsive: ["lg"],
            ...filtroListaOpciones("estructura3"),
        },
        {
            title: "Estructura4",
            dataIndex: "estructura4",
            key: "estructura4",
            filteredValue: filteredInfo.estructura4 || null,
            responsive: ["lg"],
            ...filtroListaOpciones("estructura4"),
        },
        {
            title: "Estructura5",
            dataIndex: "estructura5",
            key: "estructura5",
            filteredValue: filteredInfo.estructura5 || null,
            responsive: ["lg"],
            ...filtroListaOpciones("estructura5"),
        },
        {
            title: "Encuadre",
            dataIndex: "encuadre",
            key: "encuadre",
            filteredValue: filteredInfo.encuadre || null,
            responsive: ["lg"],
            ...filtroListaOpciones("encuadre")
        },
        {
            title: "PC-CAT",
            dataIndex: "pc_cat",
            key: "pc_cat",
            filteredValue: filteredInfo.pc_cat || null,
            responsive: ["md"],
            ...filtroBusqueda("pc_cat")
        },
        {
            title: "Ocultar",
            key: "operation",
            responsive: ["sm"],
            onCell: () => ({onClick: (e) => e.stopPropagation()}),
            render: (record) =>
                <DeleteConfirm userId={record.id} chooseEmpleados={chooseEmpleados} listaEmpleados={empleados} />,
        }
    ];

    return <>
        <Space
            style={{
                marginTop: 32,
                marginLeft: 32,
                width: "100%"
            }}
        >
            <Button onClick={clearFilters}>Eliminar filtros</Button>
            <Button onClick={clearAll}>Eliminar filtros y clasificadores</Button>
        </Space>
        <Table columns={columns} rowKey={(record) => record.id}
          onChange={handleChange}
            expandable={{
                expandedRowRender: (record) =>
                    <>
                        <p>Email: {record.email}</p>
                        <p style={{ margin: 0 }}>{record.resumen}</p>

                    </>
                ,
            }}
            onRow={(record) => ({onClick: () => {navigateUser(record.id)}})}
            dataSource={empleados} scroll={{ x: 2400 }}
            pagination={{ 
                defaultPageSize: 5, 
                showSizeChanger: true, 
                pageSizeOptions: ["5", "10", "15", "20"],
                showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} empleados`
            }} />

    </>;
};

export default ListaEmpleados;