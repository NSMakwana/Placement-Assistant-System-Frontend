import axios from 'axios';

const API_URL = 'https://placement-assistant-system.onrender.com/api/companies';


class CompanyServiceClass {
    getCompany() {
        return axios.get(API_URL); // Fetch allCompanies
    }
    getCompanyByemail(email) {
        return axios.get(`${API_URL}/companiesForStudent/${email}`); // Fetch allCompanies by batch
    }  

    deleteCompany(id) {
        return axios.delete(`${API_URL}/${id}`); // DeleteCompany by ID
    }
    getVisibleCompanies() {
   return axios.get(`${API_URL}/visible`);
}

}

export const CompanyService = new CompanyServiceClass();
