"use client"

import './styles.css';
import axios from 'axios';
import Table from './components/Table/Table';
import SearchField from './components/SearchField/SearchField';
import { ActionButton } from './components/Button/button.styles';
import { useState, useRef , useEffect } from 'react';
import Popup from './components/Popup/Popup';
import { loadData, filterData , updateRecord , deleteRecord , createRecord } from './api/api';
import CreatePopup from './components/CreatePopUp/CreatePopup';
import { Label } from './components/Popup/popup.styles';
export default function Home() {
  const [openPopUp,setOpenPopUp] =useState(false);
  const [currentRecordToUpdate,setCurrentRecordToUpdate] =useState({});
  const [data, setData] = useState({ original: [], filtered: [] });
  const [pagination, setPagination] = useState({ currentPage: 1, itemsPerPage: 6 });
  const [lastFilter,setLastFilter]=useState({type:'',value:''});
  const [totalRecords, setTotalRecords] = useState(0);
  const [openCreate,setOpenCreate]=useState(false);
  const attributes=['coin_pair','price','note','volume'];
  const fetchData = async (filterType = '', filterValue = '') => {
    try {
      let fetchedData;
      if (filterType && filterValue) {
        fetchedData=await filterData(filterType,filterValue,pagination.currentPage);
      } else {
        fetchedData = await loadData(pagination.currentPage);
      }
      setData(prevData=>{return {...prevData,filtered:fetchedData,original:!filterType && !filterValue ? data : prevData.original}});
      setTotalRecords(fetchedData.length);
    } catch (err) {
      console.error('Error fetching data: ', err);
    }
  };
  useEffect(()=>{
    fetchData(lastFilter.type, lastFilter.value);
  },[pagination.currentPage,lastFilter]);
  const reset=async()=>{
    setLastFilter({type:'',value:''});
    setPagination({...pagination,currentPage:1});
    await fetchData();
  }
  const handleNextPage=()=>{
    setPagination(prev=>{
      return {...prev,currentPage:(prev.currentPage+1)}
    })

  }
  const handlePrevPage=()=>{
    setPagination((prev)=>{
      if(prev.currentPage>1){
        return {...prev,currentPage:(prev.currentPage-1)}
      }
      return prev;
    })
    
  }
  const handleUpdate = async(e) => {
    e.preventDefault();
    console.log('i got triggered');
    console.log(currentRecordToUpdate.id);
    console.log(e.elements);
    const response=await updateRecord(currentRecordToUpdate.id,
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
  const handleCreate=async(e)=>{
    e.preventDefault();
    const response=createRecord(
      {
        coin_pair:e.target.elements.coin_pair.value,
        price:e.target.elements.price.value,
        note:e.target.elements.note.value,
        volume:e.target.elements.volume.value,
      }
    )
    await fetchData(lastFilter.type,lastFilter.value);
    setOpenCreate(false);
  }
  const handleDelete=async(id)=>{
    await deleteRecord(id);
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
    {attributes.map((attr,index)=>(
      <div className='search-field-wrapper'>
      <SearchField key={index} action={filterBy} value={attr}/>
      </div>
    ))}
    <div class='search-field-wrapper'>
      <Label onClick={(e)=>{setOpenCreate(true)}}>create</Label>
    </div>
    </div>
    <Table setOpenPopUp={setOpenPopUp} data={data.filtered} setCurrentRecordToUpdate={setCurrentRecordToUpdate} setDelete={handleDelete}/>
  {openPopUp && <Popup  currentRecordToUpdate={currentRecordToUpdate} handleUpdate={handleUpdate}/>}
  {openCreate && <CreatePopup   handleCreate={handleCreate}/>}
  
  <div className='PaginationBlock'>
  <div>
        <button onClick={handlePrevPage} disabled={pagination.currentPage === 1}>
          Prev Page
        </button>
        <button onClick={handleNextPage} disabled={totalRecords < pagination.itemsPerPage}>
          Next Page
        </button>
      </div>
  </div>
  </div>
  );
}
