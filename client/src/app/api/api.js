import axios from 'axios';
// make a proxy and a unified url that we will make all request calls to it
const api=axios.create({
    baseURL:process.env.NEXT_PUBLIC_API_BASE_URL,
});
// load all data from the first paginate by taking appropriate paginate value
export const loadData=async(paginate)=>{
    const response=await api.get(`api/paginate?paginate=${paginate}`);
    return response.data.data;
}
// filter data by its filter type and filter value also return data from which page specified by paginate parameter
export const filterData=async(filterType,filterValue,paginate)=>{
    const response=await api.post(`/api/filter/${filterType}`,{
        [filterType]:filterValue,
        paginate,
    });
    return response.data.data;
}
// update record taking all data from a form and then make api call to backend with form data to update and return its response
export const updateRecord=async(id,data)=>{
    const response=await api.put(`/api/update/${id}`,data);
    return response.data;
}
// delete record from database by sending a delete request with specified id
export const deleteRecord=async(id)=>{
    const response=await api.delete(`/api/delete/${id}`);
    return response.data;
}
export const createRecord=async(data)=>{
    const response=await api.post(`/api/create`,data);
    return  response.data;
}