"use client"

import './styles.css';
import axios from 'axios';
import Table from './components/Table/Table';
import SearchField from './components/SearchField/SearchField';
import { ActionButton } from './components/Button/button.styles';
import { useState,useRef, useEffect } from 'react';
import Popup from './components/Popup/Popup';
export default function Home() {
  const [openPopUp,setOpenPopUp] =useState(false);
  const [currentRecordToUpdate,setCurrentRecordToUpdate] =useState({});
  const [originalData,setOriginalData]=useState();
  const [records,setRecords]=useState(originalData);
  const [currentPage,setCurrentPage]=useState(1);
  const [itemsPerPage]=useState(6);
  const [lastFilter,setLastFilter]=useState({type:'',value:''});
  const [totalRecords, setTotalRecords] = useState(0);
  const fetchData = async (filterType = '', filterValue = '') => {
    try {
      let response;
      if (filterType && filterValue) {
        console.log(`http://localhost:5000/api/filter/${filterType}`);
        console.log({
          [filterType]: filterValue,
          paginate: currentPage
        });
        response = await axios.post(`http://localhost:5000/api/filter/${filterType}`, {
          [filterType]: filterValue,
          paginate: currentPage
        });
      } else {
        response = await axios.get(`http://localhost:5000/api/paginate?paginate=${currentPage}`);
      }
      const data = response.data.data;
      setRecords(data);
      setTotalRecords(data.length);
      if(!filterType && !filterValue){
        setOriginalData(data);
      }
      setOriginalData(data);
    } catch (err) {
      console.error('Error fetching data: ', err);
    }
  };
  useEffect(()=>{
    fetchData(lastFilter.type, lastFilter.value);
  },[currentPage,lastFilter]);
  const reset=async()=>{
    setLastFilter({type:'',value:''});
    setCurrentPage(1);
    await fetchData();
  }
  const handleNextPage=()=>{
     setCurrentPage((prevPage)=>prevPage+1);

  }
  const handlePrevPage=()=>{
    setCurrentPage((prev)=>{
          if(prev>1){
            return prev-1;
          }
          return prev;
        });
    
  }
  const handleUpdate = async(e) => {
    e.preventDefault();
    console.log('i got triggered');
    console.log(currentRecordToUpdate.id);
    console.log(e.elements);
    const response=await axios.put(`http://localhost:5000/api/update/${currentRecordToUpdate.id}`,
    {
      coin_pair:e.target.elements.coin_pair.value,
      price:e.target.elements.price.value,
      note:e.target.elements.note.value,
      volume:e.target.elements.volume.value,
    });
    console.log(response.data);
    await fetchData(lastFilter.type,lastFilter.value);
    setOpenPopUp(false);
  };
  const handleDelete=async(id)=>{
    await axios.delete(`http://localhost:5000/api/delete/${id}`);
    await fetchData(lastFilter.type,lastFilter.value);
  }
  const filterBy=async (ref,value)=>{
    const filterValue=ref.current.value;
    console.log('wtf is this: ',filterValue);
    try{
    if(filterValue===''){
      console.log('reset is comming');
      await reset();
      return;
    }
    setLastFilter({type:value,value:filterValue});
    console.log(lastFilter);
  }catch(err){
    console.error(err);
  }
  }
  return (
    <div class='container'>
    <h1>Coin Pair Table</h1>
    <div class='search-field-container'>
    <div className='search-field-wrapper'>
    <SearchField action={filterBy} value='coin_pair'/>
    </div>
    <div className='search-field-wrapper'>
    <SearchField action={filterBy} value='price'/>
    </div>
    <div className='search-field-wrapper'>
    <SearchField action={filterBy} value='note'/>
    </div>
    <div className='search-field-wrapper'>
    <SearchField action={filterBy} value='volume'/>
    </div>
    </div>
    <Table setOpenPopUp={setOpenPopUp} data={records} setCurrentRecordToUpdate={setCurrentRecordToUpdate} setDelete={handleDelete}/>
  {openPopUp && <Popup  currentRecordToUpdate={currentRecordToUpdate} handleUpdate={handleUpdate}/>}
  
  <div className='PaginationBlock'>
  <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev Page
        </button>
        <button onClick={handleNextPage} disabled={totalRecords < itemsPerPage}>
          Next Page
        </button>
      </div>
  </div>
  </div>
  );
}
