import axios from 'axios';
const api=axios.create({
    baseURL:process.env.NEXT_PUBLIC_API_BASE_URL,
});
export const loadData=async(paginate)=>{
    const response=await api.get(`api/paginate?paginate=${paginate}`);
    return response.data.data;
}
export const filterData=async(filterType,filterValue,paginate)=>{
    const response=await api.post(`/api/filter/${filterType}`,{
        [filterType]:filterValue,
        paginate,
    });
    return response.data.data;
}
export const updateRecord=async(id,data)=>{
    const response=await api.put(`/api/update/${id}`,data);
    return response.data;
}
export const deleteRecord=async(id)=>{
    const response=await api.delete(`/api/delete/${id}`);
    return response.data;
}