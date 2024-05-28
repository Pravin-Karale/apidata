import React, { useEffect, useState } from 'react'
import { getCategories, getCategoryWiseProduct, getProductDetails } from '../Services/category';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./List.css";


const List = () => {
    const [show,setShow]=useState(false);

    const [list, setList] = useState([]);
    const [dataSource, setTableData] = useState([]);
    const [getdata, setData] = useState({});

    const [popup, setPopUp] = useState(false);

    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 2;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = dataSource.slice(firstIndex, lastIndex);
    const npage = Math.ceil(dataSource.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1)
    const handleClickOpen = () => {
        setPopUp(!popup);
    }

    useEffect(() => {
        let mounted = true;
        getCategories()
            .then(result => {
                if (mounted) {
                    setList(result)
                }
            })
        return () => mounted = false;
    }, [])


    const getProducts = (category) => {
        let mounted = true;
        getCategoryWiseProduct(category)
            .then(result => {
                if (mounted) {
                    setTableData(result.products);
                }
            })
        return () => mounted = false;
    }

    const getDeails = (id) => {
        let mounted = true;
        getProductDetails(id)
            .then(result => {
                if (mounted) {
                    setData(result);
                    handleClickOpen(id);
                    console.log(result);
                }
            })
        return () => mounted = false;
    }


    const closePopup = () => {
        setPopUp(false);
    }


    function PerPage() {
        if (currentPage !== firstIndex) {
            setCurrentPage(currentPage - 1)
        }
    }
    function changeCurrentPage(id) {
        setCurrentPage(id)
    }

    function nextPage() {
        if (currentPage !== lastIndex) {
            setCurrentPage(currentPage + 1)
        }
    }
    // eslint-disable-next-line
    return (
        <div>
            <form>
                <div className="form-group" style={{ padding: 20, position: 'relative' }}>
                    <label>Select Category : </label>
                    <select className="form-control form-control-sm"
                        onChange={e => getProducts(e.target.value)} onClick={()=>setShow(true)}>
                        <option>None Selected</option>
                        {list.map(item => <option key={item.slug} value={item.slug}>{item.slug}</option>)}
                    </select>
                </div>
            </form>
            <div>
            {show?<table className='table table-striped' style={{ padding: 10, position: 'relative' }}>
              <thead className="thead-light" >
                        <tr>
                            <th>id</th>
                            <th>title</th>
                            <th>Stocks</th>
                            <th>Price</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map(product => (
                            <tr key={product.id} onClick={() => getDeails(product.id)}>
                                <td>{product.id}</td>
                                <td>{product.title}</td>
                                <td>{product.stock}</td>
                                <td>{product.price}</td>
                                <td>{product.rating}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>:null}
                {show?<nav>
                    <ul className='pagination'>
                        <li className='page-item'>
                            <a href="#" className='page-link' onClick={PerPage}>Prev</a>
                        </li>
                        {
                            numbers.map((n, i) => (
                                <li className={`page-item ${currentPage === n ? 'active' : " "}`} key={i}>
                                    <a href='#' className='page-link'
                                        onClick={() => changeCurrentPage(n)}>{n}</a>
                                </li>
                            ))
                        }

                        <li className='page-item'>
                            <a href="#" className='page-link' onClick={nextPage}>Next</a>
                        </li>
                    </ul>
                </nav>:null}
                <div className='container'>
                    {popup ?
                        <div className='main'>
                            <div>
                                <div className='popup'>
                                    <div className='popup-header'>
                                        <h5 className='close' onClick={closePopup}>X</h5>
                                    </div>
                                    <div>
                                        <div >
                                             <h1 className="heading">Product Images</h1>
                                           
                                            <div className="gallery">
                                                <div className="gallery-item">

                                                    {getdata.images.map(image => (
                                                        <img className='img' src={image} width="150px" height="150px" />
                                                    ))}

                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className='title'>{getdata.title}</h4>
                                        </div>
                                        <h6 className="heading-i">Category :- {getdata.category}</h6>
                                        <h6>Discription :- {getdata.description}</h6>
                                      
                                        <table className='table table-striped' style={{ padding: 10, position: 'relative' }}>
                                            <thead className="thead-light">
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Price</th>
                                                    <th>Rating</th>
                                                    <th>Stock</th>
                                                    <th>DiscountPercentage</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{getdata.id}</td>
                                                    <td>{getdata.price}</td>
                                                    <td>{getdata.rating}</td>
                                                    <td>{getdata.stock}</td>
                                                    <td>{getdata.discountPercentage}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                               </div>
                            </div>
                    
                        : ""}
                </div>
            </div>
        </div>

    )
    function PerPage () {
   if(currentPage !== 1){
    setCurrentPage(currentPage-1)
  } }
  function changeCurrentPage(id){
    setCurrentPage(id)
  }
  function nextPage () {
    if(currentPage !== npage){
      setCurrentPage(currentPage +1)
    }
  }
}

export default List;