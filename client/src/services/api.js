import axios from 'axios';

const API_URI = '';

const API_GMAIL = async (serviceUrlObject, requestData = {}, type) => {
    const { params, urlParams, ...body } = requestData;
    const authToken = localStorage.getItem('authToken');
    return await axios({
        method: serviceUrlObject.method,
        url: `${API_URI}/${serviceUrlObject.endpoint}/${type}`,
        data: requestData,
        headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
    })
}

export default API_GMAIL;