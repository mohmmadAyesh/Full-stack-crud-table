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
  const [openPopUp, setOpenPopUp] = useState(false);
  const [currentRecordToUpdate, setCurrentRecordToUpdate] = useState({});
  const [data, setData] = useState({ original: [], filtered: [] });
  const [pagination, setPagination] = useState({ currentPage: 1, itemsPerPage: 6 });
  const [lastFilter, setLastFilter] = useState({ type:'', value:'' });
  const [totalRecords, setTotalRecords] = useState(0);
  const [openCreate, setOpenCreate] = useState(false);
  const attributes=['coin_pair','price','note','volume'];
  // fetch records from back end side based on filter type and filter value if there are no filters then all data retrieved
  const fetchData = async (filterType = '', filterValue = '') => {
    try {
      let fetchedData;
      if (filterType && filterValue) {
        fetchedData=await filterData(filterType, filterValue, pagination.currentPage);
      } else {
        fetchedData = await loadData(pagination.currentPage);
      }
      setData(prevData=>{
        return {
           ...prevData,
          filtered:fetchedData,original:!filterType && !filterValue ? data : prevData.original
        };
      });
      setTotalRecords(fetchedData.length);
    } catch (err) {
      // console the error caused while fetching data
      console.error('Error fetching data: ', err);
    }
  };
  // load the all data for the first time then whenever lastFilter changes its type or value  also consider
  useEffect(()=>{
    fetchData(lastFilter.type, lastFilter.value);
  },[pagination.currentPage, lastFilter]);
  // reset to first page and load all data without any filters applied
  const reset=async()=>{
    setLastFilter({ type:'', value:'' });
    setPagination({ ...pagination, currentPage: 1 });
    await fetchData();
  }
  // handle next button on the page which paginate to next page 
  const handleNextPage=()=>{
    setPagination(prev=>{
      return { ...prev, currentPage:(prev.currentPage + 1)};
    });
  };
  // handle prev button on the page which paginate to previous page 
  const handlePrevPage=()=>{
    setPagination((prev)=>{
      if(prev.currentPage>1){
        return { ...prev, currentPage:(prev.currentPage - 1)}
      }
      return prev;
    });
  };
  // handle updating the record take all data from form submitted then send it to backend side as put request then console log its response
  const handleUpdate = async(e) => {
    e.preventDefault();
    console.log('i got triggered');
    console.log(currentRecordToUpdate.id);
    console.log(e.elements);
    const response=await updateRecord(currentRecordToUpdate.id,{
      coin_pair:e.target.elements.coin_pair.value,
      price:e.target.elements.price.value,
      note:e.target.elements.note.value,
      volume:e.target.elements.volume.value,
    });
    console.log(response.data);
    await fetchData(lastFilter.type, lastFilter.value);
    setOpenPopUp(false);
  };
  // handle creating new records taking all data from create form submitted then send it to backend end as post request then close the pop up
  const handleCreate = async(e)=>{
    e.preventDefault();
    const response=createRecord({
        coin_pair:e.target.elements.coin_pair.value,
        price:e.target.elements.price.value,
        note:e.target.elements.note.value,
        volume:e.target.elements.volume.value,
      }
    )
    await fetchData(lastFilter.type, lastFilter.value);
    setOpenCreate(false);
  }
  // delete a record from the database
  const handleDelete=async(id)=>{
    await deleteRecord(id);
    await fetchData(lastFilter.type,lastFilter.value);
  }
  // filter the records based on filter value and which filter applied from these four filters and save value in lastfilter to make filter applicable when we paginate
  const filterBy=async (ref,value)=>{
    const filterValue = ref.current.value;
    console.log('wtf is this: ',filterValue);
    try{
    if(filterValue === ''){
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
            <SearchField key = {index} action = {filterBy} value = {attr}/>
          </div>
        ))}
        <div class='search-field-wrapper'>
          <Label onClick={(e) => {setOpenCreate(true)}}>create</Label>
        </div>
      </div>
      <Table 
      setOpenPopUp = {setOpenPopUp} 
      data = {data.filtered} 
      setCurrentRecordToUpdate = {setCurrentRecordToUpdate} 
      setDelete = {handleDelete}
      />
      {openPopUp && <Popup  currentRecordToUpdate = {currentRecordToUpdate} handleUpdate = {handleUpdate}/>}
      {openCreate && <CreatePopup   handleCreate = {handleCreate}/>}
  
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
